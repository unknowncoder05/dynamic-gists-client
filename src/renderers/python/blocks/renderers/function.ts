import { Blockhandler } from '../models/blockhandler'
import { FunctionModel } from '../models/function'
import { codeBlockBlock } from './code'
import { CodeLine } from '../../../../models/code'

export function functionBlock(block:FunctionModel, blockHandler:Blockhandler, indent:number=0): (CodeLine)[] {
    let result:CodeLine[] = []
    let argsFragment = ''
    let declarationLine:CodeLine = {
        content: `def ${block.name}(${argsFragment}):`,
        indent
    }
    result.push(declarationLine)
    result = [...result, ...codeBlockBlock(block, blockHandler, indent)]
    return result
}