export default class Team{
    constructor(id, name, team_users=[]){
        this.id = id;
        this.name = name;
        this.team_users = team_users;
        this.users = [];
    }
}