export default class User{
    constructor(id, name, email, role){
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
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
