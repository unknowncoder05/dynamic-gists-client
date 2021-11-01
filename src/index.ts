import Compiler from './renderers/python/Compiler'
import helloWorldData from '././testCases/python/cases/helloWorld.json'
import nameMainData from '././testCases/python/cases/nameMain.json'

const compiler = new Compiler(nameMainData, {
    functionName:"test"
}, './dist/testCases/python/cases/')
console.log(compiler.compile())