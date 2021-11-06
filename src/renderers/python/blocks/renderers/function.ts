import { Blockhandler } from '../models/blockhandler'
import { FunctionModel } from '../models/function'
import { codeBlockRenderer } from './code'
import { CodeLine } from '../../../../models/code'

export function functionBlockRenderer(block:FunctionModel, blockHandler:Blockhandler, indent:number=0): (CodeLine)[] {
    let result:CodeLine[] = []
    let argsFragment = block.args?.map(x => `${x.name}${x.type ? ':'+x.type:''}${x.default ? '=' + x.default:''}`).join(', ')
    
    let declarationLine:CodeLine = {
        content: `def ${block.name}(${argsFragment}):`,
        indent
    }
    result.push(declarationLine)
    result = [...result, ...codeBlockRenderer(block, blockHandler, indent)]
    return result
}