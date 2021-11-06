import { BlockTypes } from '../enums/BlockTypes'
import { Argument } from './../../models/argument'
import { PythonCodeBlock } from './../../models/codeBlock'
import { DecoratorCallModel } from './decoratorCallModel'


export interface FunctionModel{
    type: BlockTypes.function,
    decorator?: DecoratorCallModel,
    name: string
    code: PythonCodeBlock[]
    args?: Argument[]
}