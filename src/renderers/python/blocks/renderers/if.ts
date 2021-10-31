import { ifModel } from '../models/if'
import { CodeLine } from '../../../../models/code'

export function ifBlock(block:ifModel, compiler:object, indent:number=0): (CodeLine)[] {
    let result = []
    let conditionLine:CodeLine = {
        content: `if ${block.condition}`
    }
    result.push(conditionLine)
    for(const line of block.code){

    }
    
    return result
}