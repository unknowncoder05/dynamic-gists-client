import Compiler from './renderers/python/Compiler'
import helloWorldData from '././testCases/python/cases/helloWorld.json'
import nameMainData from '././testCases/python/cases/nameMain.json'
import sumData from '././testCases/python/cases/sum.json'

const compiler = new Compiler(sumData, {
}, './dist/testCases/python/cases/')
console.log(compiler.compile())