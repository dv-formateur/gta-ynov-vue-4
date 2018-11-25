export default class DAOService{
    static getTableName(){};

    static getAll(callback){
        var res = JSON.parse(localStorage.getItem(this.getTableName()));
        callback(res);
    }

    static getById(callback, id){
        this.getAll(
            entityList =>{
                var res = null;
                for(var entity of entityList){
                    if(entity.id === id){
                        res = entity;
                        break;
                    }
                }
                callback(res);
            }
        );
    }

    static create(callback, entity){
        this.getAll(
            entityList =>{
                entity.id = 0;
                if(entityList.length > 0){
                    var prevItem = entityList[entityList.length - 1];
                    entity.id = prevItem.id + 1;
                }
                console.log(entity)
                entityList.push(entity);
                localStorage.setItem(this.getTableName(), JSON.stringify(entityList));
                callback(entity);
            }
        );
    }

    static modify(callback, entity){
        this.getAll(
            entityList =>{
                var index = entityList.findIndex(el => {return el.id == entity.id});
                if(index != -1){
                    entityList[index] = entity;
                    localStorage.setItem(this.getTableName(), JSON.stringify(entityList));
                }
                callback(entity);
            }
        );
    }

    static remove(callback, entity){
        this.getAll(
            entityList =>{
                var index = entityList.findIndex(el => {return el.id == entity.id});
                if(index != -1){
                    entityList.splice(index, 1);
                    localStorage.setItem(this.getTableName(), JSON.stringify(entityList));
                }
                callback();
            }
        );
    }
}