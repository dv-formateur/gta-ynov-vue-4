import User from '../entities/user.js';
export default class UserService {

    static getUsersOnProject(callback, project, max = Math.max()) {

      var res = [
        new User(1, 'admin', 'raphael-charre@hotmail.fr', 0),
        new User(2, 'user2', 'test@gmail.com', 1),
        new User(3, 'user3', 'test2@gmail.com', 1),
        new User(4, 'user4', 'test3@gmail.com', 1),
        new User(5, 'user5', 'test4@gmail.com', 1),
        new User(6, 'user6', 'test5@gmail.com', 1)
      ].filter(function(e){
        return project.project_users.indexOf(e.id) != -1;
      });

      callback(project, res);

    }

    static authenticate(callback, username, password){
      callback(new User(0, 'admin', 'raphael-charre@hotmail.fr', 0));
    }
  
  }