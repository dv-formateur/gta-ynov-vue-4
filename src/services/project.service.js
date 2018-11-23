import Project from "../entities/project";
import DAOService from './dao.service'

export default class ProjectService extends DAOService{
    static getTableName(){
        return 'projects';
    }

    static modify(callback, entity){
        entity.users = [];
        super.modify(callback, entity);
    }

    static getUserProjects(callback, user){
        super.getAll(
            projects =>{
                projects = projects.filter(function(e){
                    return e.project_users.filter(function(e2){
                        return e2.user_id == user.id
                    }).length > 0
                });
                callback(user, projects)
            }
        )
    }
}