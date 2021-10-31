import { CodeBlock, CodeLine } from './../../../../models/code'

export interface Blockhandler{
    (block:CodeBlock, args:any, indent?:number): CodeLine[] | undefined
}