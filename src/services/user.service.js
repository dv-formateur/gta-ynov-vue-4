import User from '../entities/user.js';
export default class UserService {

    static getAllUsers(callback, max = Math.max()) {
      var res = [
        new User(0, 'admin', 'raphael-charre@hotmail.fr', 0),
        new User(1, 'user1', 'test@gmail.com', 1),
        new User(2, 'user2', 'test2@gmail.com', 1),
        new User(3, 'user3', 'test3@gmail.com', 1),
        new User(4, 'user4', 'test4@gmail.com', 1),
        new User(5, 'user5', 'test5@gmail.com', 1)
      ];

      if(callback) callback(res);

    }

    static authenticate(callback, username, password){
      callback(new User(0, 'admin', 'raphael-charre@hotmail.fr', 0));
    }
  
  }