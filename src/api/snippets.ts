import { config } from './config'
import fetch from 'node-fetch';

function getAuthHeaders(token:string){
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
}

async function fetchJson(url:string, options:any){
    const response = await fetch(url, options)
    return await response.json()

}

export async function list(token:string, name?:string){
    let filters = ''
    if (name) {// TODO: implement function that recieves object and returns this
        filters += `?name=${name}`
    }
    return await fetchJson(`${config.apiBaseUrl}${config.apiVersionPath}/snippet/${filters}`, {
        headers: getAuthHeaders(token)
    })

}