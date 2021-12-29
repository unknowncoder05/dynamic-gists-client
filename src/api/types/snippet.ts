import { Pagination } from './pagination'
import { BaseModel } from './base'

export interface CreateSnippet{
    blueprint:any

    dependencies:any

    name:string

    description:string

    version:string

    latest:boolean
}

export interface CreateSnippetInput{
    snippet:string

    name:string

    description:string

    default:any

    input_type:string
}

export interface Snippet extends BaseModel{
    blueprint:any

    dependencies:any

    name:string

    description:string

    version:string

    latest:boolean

    inputs:SnippetInput[]
}

export interface SnippetInput extends BaseModel{
    feed:string
    
    created_by:string

    snippet:string

    name:string

    description:string

    default:any

    input_type:InputType
}

export interface InputType{
    name:string

    description:string
}

export interface PaginationSnippet extends Pagination{
    results: Snippet[]
}
