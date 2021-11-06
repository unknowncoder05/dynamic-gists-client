import { Blockhandler } from '../models/blockhandler'
import { PythonCodeBlock } from './../../models/codeBlock'
import { codeBlockRenderer } from './code'
import { CodeLine } from '../../../../models/code'

export function baseCodeBlockRenderer(block:PythonCodeBlock, blockHandler:Blockhandler, indent:number=0): (CodeLine)[] {
    let result:CodeLine[] = codeBlockRenderer(block, blockHandler, indent-1)
    return result
}