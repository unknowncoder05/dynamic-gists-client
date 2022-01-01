import { fetchJson } from './utils'
import { AuthenticationTokens } from './types/auth'
import { config } from './config'


export function getAuthHeaders(token:string){
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
}

export async function auth(email:string, password:string, baseApiUri?:string): Promise<{data:AuthenticationTokens | any, status:number}>{
    const credentials = {
        email, password
    }
    let currentApiUri = baseApiUri
    if(!currentApiUri){
        currentApiUri = config.apiBaseUrl
    }
    currentApiUri += `${config.apiVersionPath}/auth/token/`
    return await fetchJson(currentApiUri, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'post',
        body: JSON.stringify(credentials)
    })
}

export async function refresh(refreshToken:string, baseApiUri?:string): Promise<{data:AuthenticationTokens | any, status:number}>{
    let currentApiUri = baseApiUri
    if(!currentApiUri){
        currentApiUri = config.apiBaseUrl
    }
    currentApiUri += `${config.apiVersionPath}/auth/token/refresh/`
    return await fetchJson(currentApiUri, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'post',
        body: JSON.stringify({refresh:refreshToken})
    })
}

export async function test(){
    return await fetchJson(`https://jsonplaceholder.typicode.com/todos/1`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'get',
    })
}