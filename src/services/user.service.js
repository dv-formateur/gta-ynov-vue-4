import User from '../entities/user.js';
export default class UserService {

  static users(){return[
    new User(1, 'admin', 'raphael-charre@hotmail.fr', 0),
    new User(2, 'user2', 'test@gmail.com', 1),
    new User(3, 'user3', 'test2@gmail.com', 1),
    new User(4, 'user4', 'test3@gmail.com', 1),
    new User(5, 'user5', 'test4@gmail.com', 1),
    new User(6, 'user6', 'test5@gmail.com', 1)
  ]}

  static getUserByEmail(callback, user_mail){
    var res = UserService.users().filter(function(e){
      return e.email === user_mail;
    });

    callback(res.length > 0 ? res[0] : null);
  }

  static getUserById(callback, user_id){ 
    callback(UserService.users()[user_id]); 
  } 

  static getUsersOnProject(callback, project, max = Math.max()) {

    var res = UserService.users().filter(function(e){
      return project.project_users.indexOf(e.id) != -1;
    });

    callback(project, res);

  }

  static authenticate(callback, email, password){
    UserService.getUserByEmail(callback, email);
  }
  
  }