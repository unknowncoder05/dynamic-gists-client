import FileCompiler from './renderers/python/FileCompiler'
import ProjectCompiler from './renderers/python/ProjectCompiler'
import helloWorldData from './testCases/python/cases/helloWorld.gist.json'
import nameMainData from './testCases/python/cases/nameMain.gist.json'
import sumData from './testCases/python/cases/sum.gist.json'
import flaskData from './testCases/python/cases/flaskBasicApp.gist.json'
import basicProject from './testCases/python/cases/projects/basics/basics.p.gist.json'
import path from 'path'

async function main () {
    /*const compiler = new FileCompiler(flaskData, {
    }, path.join(process.cwd(), './src/testCases/python/cases/'))
    console.log(compiler.compile())*/

    const projectcompiler = new ProjectCompiler({
        project: basicProject, 
        projectPath: path.join(process.cwd(), './src/testCases/python/cases/projects/basics/')
    })
    let lines:any[] = await projectcompiler.codeLinesCompile() as any[]
    console.log(lines)
    console.log(lines[0].codeLines)
}
// main()

export const PythonCompiler = {
    FileCompiler,
    ProjectCompiler,
    TestData:{
        helloWorldData, nameMainData, sumData, flaskData
    }
}
/*exports.ProjectCompiler = ProjectCompiler
exports.TestData = {
    helloWorldData, nameMainData, sumData, flaskData
}*/