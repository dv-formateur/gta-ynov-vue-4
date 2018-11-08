import User from '../entities/user.js';
export default class UserService {

    static getAllUsers(callback, max = Math.max()) {
      var res = [];
      for(var i = 0; i < max; i++){
          res.push(User.create_random_user());
      }

      if(callback) callback(res);

    }
  
  }