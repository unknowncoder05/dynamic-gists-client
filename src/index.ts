import  * as snippetApi  from './api/snippets'
import  * as authApi  from './api/auth'


async function main () {

    // Api
    // Auth
    /*let access = ''
    let authTokens = {}
    if(access){
        const authTokensResponse = await authApi.auth('', '')
        authTokens = authTokensResponse
        access = authTokensResponse.access
    }
    const listResponse = await snippetApi.list(access)
    console.log(listResponse.results[0].blueprint)
    console.log(listResponse.results[0].inputs[0].name)*/

}

// main()

export const Api = {
    Snippet: snippetApi,
    Authentication: authApi,
}