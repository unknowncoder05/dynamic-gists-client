import { BlockTypes } from '../enums/BlockTypes'
import { CodeBlock } from '../../../../models/code'


export interface ifModel{
    type:BlockTypes.if,
    condition:string
    code:CodeBlock[]
}