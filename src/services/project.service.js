import Project from "../entities/project";

export default class ProjectService{
    static getUserProjects(callback, user){
        var res = [
            new Project (1, 'prj1', [1, 3]),
            new Project (2, 'prj2', [1, 2, 3]),
            new Project (3, 'prj3', [1, 2]),
        ];
        callback(user, res)
    }
}