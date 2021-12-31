import { config } from './config'
import { fetchJson } from './utils'
import { getAuthHeaders } from './auth'
import { PaginationSnippet, CreateSnippet, Snippet } from './types/snippet'

export async function list(token:string, name?:string, baseApiUri?:string): Promise<{data:PaginationSnippet | any, status:number}>{
    let currentApiUri = baseApiUri
    if(!currentApiUri){
        currentApiUri = config.apiBaseUrl
    }
    let filters = ''
    if (name) {// TODO: implement function that recieves object and returns this string
        filters += `?name=${name}`
    }
    currentApiUri += `${config.apiVersionPath}/snippet/${filters}`
    return await fetchJson(currentApiUri    , {
        headers: getAuthHeaders(token)
    })
}

export async function create(token:string, snippet:CreateSnippet, baseApiUri?:string): Promise<{data:Snippet | any, status:number}>{
    let currentApiUri = baseApiUri
    if(!currentApiUri){
        currentApiUri = config.apiBaseUrl
    }
    currentApiUri += `${config.apiVersionPath}/snippet/`
    return await fetchJson(currentApiUri, {
        method: 'post',
        headers: getAuthHeaders(token),
        body: JSON.stringify(snippet)
    })
}

export async function newVersion(token:string, pk:string, snippet:CreateSnippet, baseApiUri?:string): Promise<{data:Snippet | any, status:number}>{
    let currentApiUri = baseApiUri
    if(!currentApiUri){
        currentApiUri = config.apiBaseUrl
    }
    currentApiUri += `${config.apiVersionPath}/snippet/${pk}/`
    return await fetchJson(currentApiUri, {
        method: 'put',
        headers: getAuthHeaders(token),
        body: JSON.stringify(snippet)
    })
}