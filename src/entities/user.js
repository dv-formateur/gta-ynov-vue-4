export default class User{
    constructor(id, fname, lname, email, password, app_role){
        this.id = id;
        this.fname = fname;
        this.lname = lname;
        this.email = email;
        this.password = password;
        this.bdate = null,
        this.address = '',
        this.phone = ''
        this.app_role = app_role;
    }
    
    static create_random_user(){
        var id = Math.round(Math.random()*9999);
        return new User(
            id,
            'user-name' + id,
            id + '@mail.com',
            Math.round(Math.random()*3)
        )
    }
}
