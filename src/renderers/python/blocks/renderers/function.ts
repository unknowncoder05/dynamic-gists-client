import { functionModel } from '../models/function'
import { CodeLine } from '../../../../models/code'

export function functionBlock(block:functionModel, compiler:object, indent:number=0): (CodeLine)[] {
    let result = []
    let argsFragment = ''
    let declarationLine:CodeLine = {
        content: `def ${block.name}(${argsFragment}):`
    }
    result.push(declarationLine)
    for(const line of block.code){

    }
    
    return result
}