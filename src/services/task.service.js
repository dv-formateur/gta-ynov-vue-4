import Task from '../entities/task'
export default class TaskService {
    static getAllTasksForUser(callback, max = Math.max(), user, project, date_start = 0, date_end = Math.max()){
        var res = [
            new Task('task1-' + user.id + '-' + project.id, 'task1-' + user.id + '-' + project.id, 0, new Date('2018-11-1'), new Date('2018-11-20'), user.id, 1),
            new Task('task2-' + user.id + '-' + project.id, 'task2-' + user.id + '-' + project.id, 1, new Date('2018-11-4'), new Date('2018-11-5'), user.id, 1),
            new Task('task3-' + user.id + '-' + project.id, 'task3-' + user.id + '-' + project.id, 2, new Date('2018-11-8'), new Date('2018-11-15'), user.id, 1),
            new Task('task4-' + user.id + '-' + project.id, 'task4-' + user.id + '-' + project.id, 3, new Date('2018-11-2'), new Date('2018-11-10'), user.id, 1)
        ];
        
        res = res.filter((e)=>{
            return project.id == e.project_id;
        });

        res = res.sort((e1, e2)=>{
            return e1.date_start.getTime() < e2.date_start.getTime() ? -1 : 1
        });
        
        callback(user, res);
    }
}