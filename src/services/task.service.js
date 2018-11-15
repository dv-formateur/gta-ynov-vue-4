import Task from '../entities/task'
export default class TaskService {
    static getAllTasksForUser(callback, max = Math.max(), user, project, date_start = 0, date_end = Math.max()){
        var res = [new Task('task1', 'task1-' + user.id + '-' + project.id, 0, new Date('11-1-2018'), new Date('11-20-2018'), user.id, 1),
            new Task('task2', 'task2-' + user.id + '-' + project.id, 1, new Date('11-4-2018'), new Date('11-5-2018'), user.id, 2),
            new Task('task3', 'task3-' + user.id + '-' + project.id, 2, new Date('11-8-2018'), new Date('11-15-2018'), user.id, 2),
            new Task('task4', 'task4-' + user.id + '-' + project.id, 3, new Date('11-2-2018'), new Date('11-10-2018'), user.id, 1)];
        callback(user, res.filter(function(e){
            return project.id == e.project_id;
        }));
    }
}