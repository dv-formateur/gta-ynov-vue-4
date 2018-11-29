import User from '../entities/user.js';
import DAOService from './dao.service'
export default class UserService extends DAOService{

  static getTableName(){
    return 'users';
  }

  static create(callback, entity){
    super.getAll(
      users =>{
        var index = users.findIndex(el => {return el.email == entity.email});
        if(index == -1){
          super.create(callback, entity);
        }else{
          callback(null);
        }
      }
    )
  }

  static getUserByEmail(callback, user_mail){
    super.getAll(
      users =>{
        users = users.filter(function(e){
          return e.email === user_mail;
        });
        callback(users.length > 0 ? users[0] : null);
      }
    )
  }

  static getUserById(callback, user_id){ 
    super.getAll(
      users =>{
        users = users.filter(e=>{
          return e.id == user_id;
        })

        callback(users.length > 0 ? users[0] : null); 
      }
    )
  } 

  static getUsersOnTeam(callback, team, max = Math.max()) {
    super.getAll(
      users =>{
        var res = users.filter(function(e){
          return team.team_users.map(
            function(e){
              return e.user_id;
            }
          ).indexOf(e.id) != -1;
        });
    
        callback(team, res);
      }
    )
  }

  static authenticate(callback, email, password){
    UserService.getUserByEmail(user=>{
      var u = user.password == password ? user : null;
      callback(u);
    }, email);
  }
  
}