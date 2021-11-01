import { Blockhandler } from '../models/blockhandler'
import { PythonCodeBlock } from './../../models/codeBlock'
import { codeBlockBlock } from './code'
import { CodeLine } from '../../../../models/code'

export function baseCodeBlock(block:PythonCodeBlock, blockHandler:Blockhandler, indent:number=0): (CodeLine)[] {
    let result:CodeLine[] = codeBlockBlock(block, blockHandler, indent-1)
    return result
}