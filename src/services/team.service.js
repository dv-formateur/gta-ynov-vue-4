import Team from "../entities/team";
import DAOService from './dao.service'

export default class TeamService extends DAOService{
    static getTableName(){
        return 'teams';
    }

    static modify(callback, entity){
        entity.users = [];
        super.modify(callback, entity);
    }

    static getUserTeams(callback, user, isAdmin = false){
        super.getAll(
            teams =>{
                if(!isAdmin){
                    teams = teams.filter(function(e){
                        return e.team_users.filter(function(e2){
                            return e2.user_id == user.id
                        }).length > 0
                    });
                }
                callback(user, teams)
            }
        )
    }

}