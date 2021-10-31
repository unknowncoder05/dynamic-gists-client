import { BlockTypes } from '../enums/BlockTypes'
import { Argument } from './../../models/argument'
import { PythonCodeBlock } from './../../models/codeBlock'


export interface FunctionModel{
    type:BlockTypes.function,
    name:string
    code:PythonCodeBlock[]
    args:Argument[]
}