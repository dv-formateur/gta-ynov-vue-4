import Task from '../entities/task'
import DAOService from './dao.service'

export default class TaskService extends DAOService{
    static getTableName(){
        return 'tasks'
    }

    static getAllTasksForUser(callback, max = Math.max(), user, project, date_start = 0, date_end = Math.max()){
        super.getAll(
            tasks =>{
                tasks = tasks.filter((e)=>{
                    return project.id == e.project_id && e.user_id == user.id;
                });
        
                tasks = tasks.sort((e1, e2)=>{
                    return new Date(e1.date_start).getTime() < new Date(e2.date_start).getTime() ? -1 : 1
                });
                
                callback(user, tasks);
            }
        );
    }
}