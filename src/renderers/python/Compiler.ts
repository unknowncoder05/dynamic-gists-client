import { renderers } from './blocks/renderers'
import { CodeLine } from './../../models/code'
import { PythonCodeBlock } from './models/codeBlock'
import { VariableTypes } from './enums/VariableTypes'
import path from 'path'

const loadBlockRegex = /^:/
const loadBlockRegexRemove = /^:/
const renderInputRegex = /##(.*?)##/g
const renderInputRegexRemove = /##/g

export default class Compiler{
    originalBlock:PythonCodeBlock | undefined
    renderedBlock:PythonCodeBlock | undefined
    originalArgs:any
    baseRoute:string

    constructor(block:PythonCodeBlock, args:any, baseRoute:string, blockRoute:string='base'){
        this.originalBlock = block
        this.originalArgs = args
        this.baseRoute = baseRoute
        this.renderedBlock = renderBlockInputs(block, args, baseRoute, blockRoute)
    }
    
    codeLinesCompile(): CodeLine[] | undefined{
        let codeLines = blockHandler(this.renderedBlock)
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

function blockHandler(block:PythonCodeBlock | undefined, indent:number=0): CodeLine[] | undefined{
    if (!block) return
    if (renderers.hasOwnProperty(block.type)){
        return renderers[block.type](block, blockHandler, indent)
    } else {
        console.error(`'${block.type}' is not a valid block type`)
    }
}

function renderBlockInputs(block: PythonCodeBlock, args:any, baseRoute:string, blockRoute:string): PythonCodeBlock | undefined{
    let loadedRequiredBlocks = getRequiredInputsFromBlock(block, args, baseRoute, blockRoute)
    let renderedBlock = block
    let inputs = getInputsFromBlock(renderedBlock, args, blockRoute)
    inputs = Object.assign(inputs, loadedRequiredBlocks.inputs)
    inputs = replaceStringsInObject(inputs, inputs, args, blockRoute)
    let result = replaceStringsInObject(renderedBlock, inputs, renderedBlock.renderInputs, blockRoute)
    
    return result
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
                let rawInputValue = matches[0].replace(renderInputRegexRemove,'')
                if (loadBlockRegex.test(rawInputValue)){
                    let value = args[rawInputValue.replace(loadBlockRegexRemove, '')]
                    return value
                }
            }
            for(const match of matches){
                let value = args[match.replace(renderInputRegexRemove,'')]
                var replace = match;
                var re = new RegExp(replace,"g");
                result = result.replace(re, value)
            }
        }

        return result
    }
    return block
    
}

function getInputsFromBlock(block: PythonCodeBlock, args:any, blockRoute:string): any{
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

function getRequiredInputsFromBlock(block: PythonCodeBlock, args:any, baseRoute:string, blockRoute:string): any{
    if(!block.requires) return {
        inputs:[]
    }
    let inputs:{[key:string]:any} = {}
    for(const requirement of block.requires){
        const importPathDir = path.join(process.cwd(), baseRoute)
        const importPathFile = path.join(importPathDir, requirement.from)
        const importCodeBlock:PythonCodeBlock = require(importPathFile)
        let requirementName = ''
        if(requirement.as){
            requirementName = requirement.as
        } else {
            requirementName = path.basename(requirement.from).split('.')[0]
        }
        const importBlock = new Compiler(importCodeBlock, args, baseRoute, `${blockRoute ? blockRoute+'.' : blockRoute}${requirementName}`)
        inputs[requirementName] = importBlock.renderedBlock//codeLinesCompile()
    }
    return {
        inputs
    }
}