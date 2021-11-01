import { renderers } from './blocks/renderers'
import { CodeLine } from './../../models/code'
import { PythonCodeBlock } from './models/codeBlock'

export default class Compiler{
    originalBlock:PythonCodeBlock | undefined
    renderedBlock:PythonCodeBlock | undefined
    originalArgs:any

    constructor(block:PythonCodeBlock, args:any){
        this.originalBlock = block
        this.originalArgs = args

        this.renderedBlock = renderBlockInputs(block, args)
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

function renderBlockInputs(block: PythonCodeBlock, args:any): PythonCodeBlock | undefined{
    let inputs = getInputsFromBlock(block, args)
    for(const inputName in inputs){
        let matches = inputs[inputName].match(/##(.*?)##/g)
        if(matches){
            for(const match of matches){
                let value = inputs[match.replace(/##/g,'')]
                var replace = match;
                var re = new RegExp(replace,"g");
                inputs[inputName] = inputs[inputName].replace(re, value)
            }
        }
    }
    let result = replaceStringsInObject(block, inputs)
    return result
}

function replaceStringsInObject(block:any, args:any): any{
    if(Array.isArray(block)){
        let result = []
        for(const blockItem of block){
            result.push(replaceStringsInObject(blockItem, args))
        }
        return result
    }
    if(typeof block === 'object'){
        let result:any = {}
        for(const blockPropperty in block){
            result[blockPropperty] = replaceStringsInObject(block[blockPropperty], args)
        }
        return result
    }
    if(typeof block === 'string'){
        let matches = block.match(/##(.*?)##/g)
        let result = block
        if(matches){
            for(const match of matches){
                let value = args[match.replace(/##/g,'')]
                var replace = match;
                var re = new RegExp(replace,"g");
                result = result.replace(re, value)
            }
        }

        return result
    }
    return block
    
}

function getInputsFromBlock(block: PythonCodeBlock, args:any): any{
    let inputs:any = {}
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
