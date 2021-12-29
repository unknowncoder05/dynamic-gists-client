import { fetchJson } from './utils'
import { AuthenticationTokens } from './types/auth'
import { config } from './config'


export function getAuthHeaders(token:string){
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
}

export async function auth(email:string, password:string): Promise<AuthenticationTokens>{
    const credentials = {
        email, password
    }
    return await fetchJson(`${config.apiBaseUrl}${config.apiVersionPath}/auth/token/`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'post',
        body: JSON.stringify(credentials)
    })
}