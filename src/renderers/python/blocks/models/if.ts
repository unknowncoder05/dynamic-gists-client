import { BlockTypes } from '../enums/BlockTypes'
import { PythonCodeBlock } from './../../models/codeBlock'


export interface ifModel{
    type: BlockTypes.if,
    condition: string
    code: PythonCodeBlock[]
}