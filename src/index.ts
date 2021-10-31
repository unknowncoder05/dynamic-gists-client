import Compiler from './renderers/python/Compiler'
import data from './testCases/python/cases/helloWorld.json'

const compiler = new Compiler(data, {})
console.log(compiler.codeLinesCompile())