import fetch from 'node-fetch';

export async function fetchJson(url:string, options:any){
    const response = await fetch(url, options)
    return {
        data: await response.json(),
        status: response.status
    }
}