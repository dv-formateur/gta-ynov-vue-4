import Task from '../entities/task'
export default class TaskService {

    static tasks(){
        return JSON.parse(localStorage.getItem('tasks')).map(task=>{
            task.date_start = moment(task.date_start);
            task.date_end = moment(task.date_end);
            return task;
        });
    }

    static getAllTasksForUser(callback, max = Math.max(), user, project, date_start = 0, date_end = Math.max()){
        var res = TaskService.tasks();
        
        res = res.filter((e)=>{
            return project.id == e.project_id && e.user_id == user.id;
        });

        res = res.sort((e1, e2)=>{
            return new Date(e1.date_start).getTime() < new Date(e2.date_start).getTime() ? -1 : 1
        });
        
        callback(user, res);
    }

    static createTask(callback, user, user_id, project_id, name, start, end){
        var tasksList = this.tasks();
        var prevTask = tasksList[tasksList.length - 1];
        var task_id = prevTask.id + 1;
        var task = new Task(task_id, name, 0, start, end, user_id, project_id, 0);
        tasksList.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasksList));
        callback(task);
    }

    static editTask(callback, task){
        var tasksList = this.tasks();
        var index = tasksList.findIndex(el => {return el.id == task.id});
        if(index != -1){
            tasksList[index] = task;
            localStorage.setItem('tasks', JSON.stringify(tasksList));
        }
        callback();
    }

    static removeTask(callback, task){
        var tasksList = this.tasks();
        var index = tasksList.findIndex(el => {return el.id == task.id});
        if(index != -1){
            tasksList.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(tasksList));
        }
        callback();
    }
}