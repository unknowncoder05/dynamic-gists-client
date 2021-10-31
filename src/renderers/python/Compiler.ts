import { renderers } from './blocks/renderers'
import { CodeBlock, CodeLine } from './../../models/code'

export default class Compiler{
    originalBlock:CodeBlock
    originalArgs:any
    constructor(block:CodeBlock, args:any){
        this.originalBlock = block
        this.originalArgs = args
    }
    
    codeLinesCompile(): CodeLine[] | undefined{
        return this.blockHandler(this.originalBlock, this.originalArgs)
    }

    blockHandler(block:CodeBlock, args:any): CodeLine[] | undefined{
        if (renderers.hasOwnProperty(block.type)){
            return renderers[block.type](block, this)
        } else {
            console.error(`'${block.type}' is not a valid block type`)
        }
    }
}