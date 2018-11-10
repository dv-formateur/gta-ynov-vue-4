import Task from '../entities/task'
export default class TaskService {
    static getAllTasksForUser(callback, max = Math.max(), user, date_start = 0, date_end = Math.max()){
        var res = [new Task('task1', 'nom tache 1', 0, new Date('11-1-2018'), new Date('11-20-2018'), user.id),
            new Task('task2', 'nom tache 2', 1, new Date('11-4-2018'), new Date('11-5-2018'), user.id),
            new Task('task3', 'nom tache 3', 2, new Date('11-8-2018'), new Date('11-15-2018'), user.id),
            new Task('task4', 'nom tache 4', 3, new Date('11-2-2018'), new Date('11-10-2018'), user.id)];
        callback(user, res);
    }
}