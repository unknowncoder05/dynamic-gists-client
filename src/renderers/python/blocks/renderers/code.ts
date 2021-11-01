import { Blockhandler } from '../models/blockhandler'
import { CodeLine } from '../../../../models/code'
import { PythonCodeBlock } from './../../models/codeBlock'

export function codeBlockBlock(block:PythonCodeBlock, blockHandler:Blockhandler, indent:number=0): (CodeLine)[] {
    let result:CodeLine[] = []
    for(const line of block.code){
        let compiledBlocks = blockHandler(line, indent+1)
        if(!!compiledBlocks){
            result = [...result, ...compiledBlocks]
        }
    }
    return result
}