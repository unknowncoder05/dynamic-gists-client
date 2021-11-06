import { ifBlock } from './renderers/if'
import { functionBlockRenderer } from './renderers/function'
import { functionCallBlockRenderer } from './renderers/functionCall'
import { baseCodeBlockRenderer } from './renderers/baseCode'
import { CodeLine } from '../../../models/code'
import { Blockhandler } from './models/blockhandler'


interface Renderer{
    (block:any, blockhandler:Blockhandler, indent?:number):(CodeLine)[]
}
export const renderers:{[key:string]:Renderer} = {
    if: ifBlock,
    function: functionBlockRenderer,
    functionCall: functionCallBlockRenderer,
    code: baseCodeBlockRenderer
}