import { Blockhandler } from '../models/blockhandler'
import { ifModel } from '../models/if'
import { CodeLine } from '../../../../models/code'

export function ifBlock(block:ifModel, blockHandler:Blockhandler, indent:number=0): (CodeLine)[] {
    let result = []
    let conditionLine:CodeLine = {
        content: `if ${block.condition}`,
        indent
    }
    result.push(conditionLine)
    for(const line of block.code){
        let compiledBlocks = blockHandler(line, indent+1)
        if(!!compiledBlocks){
            result = [...result, ...compiledBlocks]
        }
    }
    
    return result
}