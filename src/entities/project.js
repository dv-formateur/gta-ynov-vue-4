export default class Project{
    constructor(id, name, project_users=[]){
        this.id = id;
        this.name = name;
        this.project_users = project_users;
        this.users = [];
    }
}