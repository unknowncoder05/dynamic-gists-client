import { CodeBlock } from './../../../models/code'
import { Argument } from './argument'

interface RequiredField{
    from:string,
    import:string,
    as:string
}
export interface PythonCodeBlock extends CodeBlock {
    renderInputs?: {[key:string]:Argument}
    requires?: RequiredField[]
}