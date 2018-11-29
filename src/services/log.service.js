export default class LogService{
    static getTableName(){
        return 'logs';
    }

    static getAll(callback){
        var res = JSON.parse(localStorage.getItem(this.getTableName()));
        callback(res);
    }

    static create(callback, entity){
        this.getAll(
            entityList =>{
                entity.id = 0;
                if(entityList.length > 0){
                    var prevItem = entityList[entityList.length - 1];
                    entity.id = prevItem.id + 1;
                }
                entityList.push(entity);
                localStorage.setItem(this.getTableName(), JSON.stringify(entityList));
                callback(entity);
            }
        );
    }

}