import { Project } from './models/project'
import { CodeLine } from './../../models/code'


export default class ProjectCompiler{
    project:Project
    projectPath:string

    constructor(project:Project, projectPath:string){
        this.project = project
        this.projectPath = projectPath
    }
    
    codeLinesCompile(): CodeLine[][] | undefined{
        return 
    }

    compile(tab:string='    '): string{
        return ''
    }
}