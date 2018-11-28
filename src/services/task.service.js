import Task from '../entities/task'
import DAOService from './dao.service'

export default class TaskService extends DAOService{
    static getTableName(){
        return 'tasks'
    }

    static getAllTasksForUser(callback, max = Math.max(), user, team, date_start = 0, date_end = Math.max()){
        super.getAll(
            tasks =>{
                tasks = tasks.filter((e)=>{
                    console.log(e)
                    return (team.id == e.team_id || e.team_id == null) && e.user_id == user.id;
                });
        
                tasks = tasks.sort((e1, e2)=>{
                    return new Date(e1.date_start).getTime() < new Date(e2.date_start).getTime() ? -1 : 1
                });
                
                callback(user, tasks);
            }
        );
    }
}