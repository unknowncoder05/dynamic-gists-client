import { CodeBlock } from './../../../models/code'
import { Argument } from './argument'

export interface PythonCodeBlock extends CodeBlock {
    renderInputs?: {[key:string]:Argument}
}