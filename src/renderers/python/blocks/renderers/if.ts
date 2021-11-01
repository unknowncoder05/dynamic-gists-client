import { Blockhandler } from '../models/blockhandler'
import { ifModel } from '../models/if'
import { codeBlockBlock } from './code'
import { CodeLine } from '../../../../models/code'

export function ifBlock(block:ifModel, blockHandler:Blockhandler, indent:number=0): (CodeLine)[] {
    let result:CodeLine[] = []
    let conditionLine:CodeLine = {
        content: `if ${block.condition}`,
        indent
    }
    result.push(conditionLine)
    result = [...result, ...codeBlockBlock(block, blockHandler, indent)]
    return result
}