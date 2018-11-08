export default class Task{
    constructor(id, title, type, date_start, date_end, user_id){
        this.id = id;
        this.title = title;
        this.type = type;
        this.date_start = date_start;
        this.date_end = date_end;
        this.user_id = user_id;
    }
}
