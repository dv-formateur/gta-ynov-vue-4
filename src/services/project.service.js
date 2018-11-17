import Project from "../entities/project";

export default class ProjectService{
    static getUserProjects(callback, user){
        var res = [
            new Project (1, 'prj1', [
            {
                user_id : 1,
                role: 0
            }, 
            {
                user_id : 3,
                role: 2
            }]),
            new Project (2, 'prj2', [
            {
                user_id : 1,
                role: 0
            }, 
            {
                user_id : 2,
                role: 1
            }, 
            {
                user_id : 3,
                role: 2
            }]
            ),
            new Project (3, 'prj3', [
            {
                user_id : 1,
                role: 2
            }, 
            {
                user_id : 2,
                role: 1
            }]),
        ];
        callback(user, res)
    }
}