import { BlockTypes } from '../enums/BlockTypes'
import { Argument } from './argument'
import { CodeBlock } from '../../../../models/code'

export interface FunctionModel{
    type:BlockTypes.function,
    name:string
    code:CodeBlock[]
    args:Argument[]
}