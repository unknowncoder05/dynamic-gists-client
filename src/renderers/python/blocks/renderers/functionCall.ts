import { Blockhandler } from '../models/Blockhandler'
import { FunctionCallModel } from '../models/functionCall'
import { CodeLine } from '../../../../models/code'

export function functionCallBlock(block:FunctionCallModel, _:Blockhandler, indent:number=0): (CodeLine)[] {
    let result = []
    let argsFragment = block.args.join(", ")
    let declarationLine:CodeLine = {
        content: `${block.function}(${argsFragment})`,
        indent: indent
    }
    result.push(declarationLine)
    
    return result
}