import { ifBlock } from './renderers/if'
import { functionBlock } from './renderers/function'
import { functionCallBlock } from './renderers/functionCall'
import { CodeLine } from '../../../models/code'
import { Blockhandler } from './models/Blockhandler'


interface Renderer{
    (block:any, blockhandler:Blockhandler, indent?:number):(CodeLine)[]
}
export const renderers:{[key:string]:Renderer} = {
    if: ifBlock,
    function: functionBlock,
    functionCall: functionCallBlock
}