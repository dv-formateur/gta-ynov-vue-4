export default class Task{
    constructor(id, title, type, date_start, date_end, user_id, project_id, validated){
        this.id = id;
        this.title = title;
        this.type = type;
        this.date_start = moment(date_start);
        this.date_end = moment(date_end);
        this.user_id = user_id;
        this.project_id = project_id;
        this.validated = validated;
    }
}
