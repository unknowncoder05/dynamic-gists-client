import { Project } from './models/project'
import FileCompiler from './FileCompiler'
import { CompiledFile } from './models/file'

import path from 'path'

export default class ProjectCompiler{
    project:Project
    projectPath:string

    constructor(project:Project, projectPath:string){
        this.project = project
        this.projectPath = projectPath
    }
    
    codeLinesCompile(): CompiledFile[] | undefined {
        let fileCodeLines = []
        for(const file of this.project.files){
            const filePath = path.join(this.projectPath, file.path)
            const fileContent = require(filePath)
            const fileCompiler = new FileCompiler(fileContent, file.args, filePath)
            fileCodeLines.push(
                fileCompiler.codeLinesCompile()
            )
        }
        console.log(fileCodeLines)
        return fileCodeLines
    }

    compile(): CompiledFile[]{
        let fileCodeLines = []
        for(const file of this.project.files){
            const filePath = path.join(this.projectPath, file.path)
            const fileContent = require(filePath)
            const fileCompiler = new FileCompiler(fileContent, file.args, filePath)
            fileCodeLines.push(
                fileCompiler.compile()
            )
        }
        console.log(fileCodeLines)
        return fileCodeLines
    }
}