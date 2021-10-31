import { CodeLine } from './../../../../models/code'
import { PythonCodeBlock } from './../../models/codeBlock'


export interface Blockhandler{
    (block:PythonCodeBlock, args:any, indent?:number): CodeLine[] | undefined
}