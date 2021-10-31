import { Blockhandler } from '../models/blockhandler'
import { FunctionModel } from '../models/function'
import { CodeLine } from '../../../../models/code'

export function functionBlock(block:FunctionModel, blockHandler:Blockhandler, indent:number=0): (CodeLine)[] {
    let result = []
    let argsFragment = ''
    let declarationLine:CodeLine = {
        content: `def ${block.name}(${argsFragment}):`,
        indent
    }
    result.push(declarationLine)
    for(const line of block.code){
        let compiledBlocks = blockHandler(line, indent+1)
        if(!!compiledBlocks){
            result = [...result, ...compiledBlocks]
        }
    }
    
    return result
}