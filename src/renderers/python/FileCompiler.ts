import { renderers } from './blocks/renderers'
import { ImportBlockRenderer } from './blocks/renderers/import'
import { CodeLine } from './../../models/code'
import { PythonBaseCodeBlock } from './models/codeBlock'
import { Import } from './models/import'
import { BlockTypes } from './blocks/enums/BlockTypes'
import path from 'path'

const loadBlockRegex = /^:/
const loadBlockRegexRemove = /^:/
const renderInputRegex = /##(.*?)##/g
const renderInputRegexRemove = /##/g

export default class FileCompiler{
    originalBlock:PythonBaseCodeBlock | undefined
    renderedBlock:PythonBaseCodeBlock | undefined
    originalArgs:any
    inputs:any
    imports:Import[]
    baseRoute:string

    constructor(block:PythonBaseCodeBlock, args:any, baseRoute:string, blockRoute:string='base'){
        this.originalBlock = block
        this.originalArgs = args
        this.baseRoute = baseRoute
        let inputRenderingResult = renderBlockInputs(block, args, baseRoute, blockRoute)
        this.renderedBlock = inputRenderingResult.result
        this.inputs = inputRenderingResult.inputs
        let imports = getImports(this.renderedBlock)
        this.imports = imports ? imports : [] 
    }
    
    codeLinesCompile(): CodeLine[] | undefined{
        let codeLines:CodeLine[] = []
        let importCodeLines = ImportBlockRenderer(this.imports)
        if(importCodeLines)
            codeLines = [ ...codeLines, ...importCodeLines]
        let mainCodeLines = blockHandler(this.renderedBlock)
        if(mainCodeLines)
            codeLines = [ ...codeLines, ...mainCodeLines]
        return codeLines
    }

    compile(tab:string='    '): string{
        let codeLines = this.codeLinesCompile()
        let resultLines = []
        if(!codeLines) return ''
        
        for(const line of codeLines){
            let indentationString = ''
            if (line.indent != undefined && line.indent > 0){
                indentationString = Array(line.indent+1).join(tab)
            }
            resultLines.push(`${indentationString}${line.content}`)
        }
        let result = resultLines.join('\n')
        return result
    }
}

function getImports(block:PythonBaseCodeBlock | PythonBaseCodeBlock[] | undefined): Import[] | undefined{
    if(Array.isArray(block)){
        let result:Import[] = []
        for(const blockItem of block){
            let newImports = getImports(blockItem)
            if(newImports)
                result = [ ...result, ...newImports]
        }
        return result
    }
    if(typeof block === 'object'){
        let result:Import[] = block.imports ? block.imports : []
        
        if(block.code){
            let newImports = getImports(block.code)
            if(newImports)
                result = [ ...result, ...newImports]
        }
        return result
    }
}

function blockHandler(block:PythonBaseCodeBlock | undefined, indent:number=0): CodeLine[] | undefined{
    if (!block) return
    if (renderers.hasOwnProperty(block.type)){
        return renderers[block.type](block, blockHandler, indent)
    } else {
        console.error(`'${block.type}' is not a valid block type`)
    }
}

function renderBlockInputs(block: PythonBaseCodeBlock, args:any, baseRoute:string, blockRoute:string): {result:PythonBaseCodeBlock | undefined, inputs:any}{
    let loadedRequiredBlocks = getRequiredInputsFromBlock(block, args, baseRoute, blockRoute)
    let renderedBlock = block
    let inputs = getInputsFromBlock(renderedBlock, args, blockRoute)
    inputs = Object.assign(inputs, loadedRequiredBlocks.inputs)
    inputs = replaceStringsInObject(inputs, inputs, renderedBlock.renderInputs, blockRoute)
    let result = replaceStringsInObject(renderedBlock, inputs, renderedBlock.renderInputs, blockRoute)
    
    return {
        result,
        inputs
    }
}

function replaceStringsInObject(block:any, args:any, argsDefinition:any, blockRoute:string): any{
    if(Array.isArray(block)){
        let result = []
        for(const blockItem of block){
            result.push(replaceStringsInObject(blockItem, args, argsDefinition, blockRoute))
        }
        return result
    }
    if(typeof block === 'object'){
        let result:any = {}
        for(const blockPropperty in block){
            result[blockPropperty] = replaceStringsInObject(block[blockPropperty], args, argsDefinition, blockRoute)
        }
        return result
    }
    if(typeof block === 'string'){
        let matches = block.match(renderInputRegex)
        let result = block
        if(matches){
            if(matches.length == 1 && matches[0] == block){
                let rawLoadInputValue = matches[0].replace(renderInputRegexRemove,'')
                if (loadBlockRegex.test(rawLoadInputValue)){
                    let rawInputValue = rawLoadInputValue.replace(loadBlockRegexRemove, '')
                    let value = getInputAttribute(rawInputValue, args, blockRoute)
                    return value
                }
            }
            for(const match of matches){
                let rawInputName = match.replace(renderInputRegexRemove,'')
                let value = getInputAttribute(rawInputName, args, blockRoute)
                var replace = match;
                var re = new RegExp(replace,"g");
                result = result.replace(re, value)
            }
        }

        return result
    }
    return block
    
}

function getInputAttribute(rawInputName:string, args:any, blockRoute:string): any{
    let value = args
    if(/\./.test(rawInputName)){
        for(const part of rawInputName.split('.')){
            if(!value.hasOwnProperty(part)){
                value = undefined
                console.error(`${blockRoute} attribute ${rawInputName} is not defined`);
                break
            }
            value = value[part]
        }
    } else {
        value = value[rawInputName]
    }
    return value
}

function getInputsFromBlock(block: PythonBaseCodeBlock, args:any, blockRoute:string): any{
    let inputs:{[key:string]:any} = {}
    for(const renderInput in block.renderInputs){        
        if(args.hasOwnProperty(renderInput)){
            inputs[renderInput] = args[renderInput]
            // TODO: check input type
            /*if(typeof args[renderInput] == block.renderInputs[renderInput].type)
            else console.error(`'${renderInput}' input incorrect type ${}, expected ${}`)*/
        } else {
            if(!block.renderInputs[renderInput].hasOwnProperty('default')){
                console.error(`required argument '${renderInput}' was not set`)
            }
            inputs[renderInput] = block.renderInputs[renderInput].default
        }
    }
    return inputs
}

function getRequiredInputsFromBlock(block: PythonBaseCodeBlock, args:any, baseRoute:string, blockRoute:string): any{
    if(!block.requires) return {
        inputs:[]
    }
    let inputs:{[key:string]:any} = {}
    for(const requirement of block.requires){
        const importPathDir = path.join(process.cwd(), baseRoute)
        const importPathFile = path.join(importPathDir, requirement.from)
        const importCodeBlock:PythonBaseCodeBlock = require(importPathFile)
        let requirementName = ''
        if(requirement.as){
            requirementName = requirement.as
        } else {
            requirementName = path.basename(requirement.from).split('.')[0]
        }
        const importBlock = new FileCompiler(importCodeBlock, args, baseRoute, `${blockRoute ? blockRoute+'.' : blockRoute}${requirementName}`)
        inputs[requirementName] = importBlock.renderedBlock//codeLinesCompile()
        inputs = Object.assign(inputs, importBlock.inputs)
    }
    return {
        inputs
    }
}