export default class Task{
    constructor(id, title, date_start, date_end, user_id, team_id, validated, occupation_id = 1){
        this.id = id;
        this.title = title;
        this.date_start = moment(date_start);
        this.date_end = moment(date_end);
        this.user_id = user_id;
        this.team_id = team_id;
        this.validated = validated;
        this.occupation_id = occupation_id;
        this.employee_demand = {
            date_start : null,
            date_end : null
        }
    }
}
