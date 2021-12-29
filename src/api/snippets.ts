import { config } from './config'
import { fetchJson } from './utils'
import { getAuthHeaders } from './auth'
import { PaginationSnippet, CreateSnippet, Snippet } from './types/snippet'

export async function list(token:string, name?:string): Promise<PaginationSnippet>{
    let filters = ''
    if (name) {// TODO: implement function that recieves object and returns this string
        filters += `?name=${name}`
    }
    return await fetchJson(`${config.apiBaseUrl}${config.apiVersionPath}/snippet/${filters}`, {
        headers: getAuthHeaders(token)
    })
}

export async function create(token:string, snippet:CreateSnippet): Promise<Snippet>{
    return await fetchJson(`${config.apiBaseUrl}${config.apiVersionPath}/snippet/`, {
        method: 'post',
        headers: getAuthHeaders(token),
        body: JSON.stringify(snippet)
    })
}

export async function newVersion(token:string, pk:string, snippet:CreateSnippet): Promise<Snippet>{
    return await fetchJson(`${config.apiBaseUrl}${config.apiVersionPath}/snippet/${pk}/`, {
        method: 'put',
        headers: getAuthHeaders(token),
        body: JSON.stringify(snippet)
    })
}