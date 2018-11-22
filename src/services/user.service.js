import User from '../entities/user.js';
export default class UserService {

  static users(){
    return JSON.parse(localStorage.getItem('users'));
  }

  static getUserByEmail(callback, user_mail){
    var res = UserService.users().filter(function(e){
      return e.email === user_mail;
    });

    callback(res.length > 0 ? res[0] : null);
  }

  static getUserById(callback, user_id){ 
    callback(UserService.users()[user_id-1]); 
  } 

  static getUsersOnProject(callback, project, max = Math.max()) {

    var res = UserService.users().filter(function(e){
      return project.project_users.map(
        function(e){
          return e.user_id;
        }
      ).indexOf(e.id) != -1;
    });

    callback(project, res);

  }

  static getAll(callback){
    callback(UserService.users());
  }

  static authenticate(callback, email, password){
    UserService.getUserByEmail(callback, email);
  }
  
}