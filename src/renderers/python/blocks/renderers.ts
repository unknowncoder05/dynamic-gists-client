import { ifBlock } from './renderers/if'
import { functionBlock } from './renderers/function'
import { CodeLine } from '../../../models/code'

interface Renderer{
    (block:any, compiler:object, indent?:number):(CodeLine)[]
}
export const renderers:{[key:string]:Renderer} = {
    if: ifBlock,
    function: functionBlock

}