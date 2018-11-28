export default class Log{
    constructor(id, mail, type, action, details){
        this.id = id;
        this.mail = mail;
        this.date = new Date();
        this.action = action;
        this.type = type;
        this.details = details;
    }
}