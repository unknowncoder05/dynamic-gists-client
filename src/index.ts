import FileCompiler from './renderers/python/FileCompiler'
import ProjectCompiler from './renderers/python/ProjectCompiler'
import helloWorldData from './testCases/python/cases/helloWorld.json'
import nameMainData from './testCases/python/cases/nameMain.json'
import sumData from './testCases/python/cases/sum.json'
import flaskData from './testCases/python/cases/flaskBasicApp.json'
import basicProject from './testCases/python/cases/projects/basics/basics.p.gist.json'
import path from 'path'

function main () {
    /*const compiler = new FileCompiler(flaskData, {
    }, path.join(process.cwd(), './src/testCases/python/cases/'))
    console.log(compiler.compile())*/

    const projectcompiler = new ProjectCompiler(basicProject, path.join(process.cwd(), './src/testCases/python/cases/projects/basics/'))
    console.log(projectcompiler.codeLinesCompile())
}
main()

exports.FileCompiler = FileCompiler
exports.ProjectCompiler = ProjectCompiler
exports.TestData = {
    helloWorldData, nameMainData, sumData, flaskData
}