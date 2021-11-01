import { ifBlock } from './renderers/if'
import { functionBlock } from './renderers/function'
import { functionCallBlock } from './renderers/functionCall'
import { codeBlockBlock } from './renderers/code'
import { baseCodeBlock } from './renderers/baseCode'
import { CodeLine } from '../../../models/code'
import { Blockhandler } from './models/blockhandler'


interface Renderer{
    (block:any, blockhandler:Blockhandler, indent?:number):(CodeLine)[]
}
export const renderers:{[key:string]:Renderer} = {
    if: ifBlock,
    function: functionBlock,
    functionCall: functionCallBlock,
    code: baseCodeBlock
}