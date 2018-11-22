import Project from "../entities/project";

export default class ProjectService{
    static projects(){
        return JSON.parse(localStorage.getItem('projects'));
    }

    static getUserProjects(callback, user){
        var res = this.projects().filter(function(e){
            return e.project_users.filter(function(e2){
                return e2.user_id == user.id
            }).length > 0
        });
        callback(user, res)
    }
}