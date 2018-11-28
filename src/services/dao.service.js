import LogService from './log.service'
import Log from '../entities/log.js'
import VueSession from 'vue-session'

Vue.use(VueSession)

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

    static create(user, callback, entity){
        this.getAll(
            entityList =>{
                entity.id = 0;
                if(entityList.length > 0){
                    var prevItem = entityList[entityList.length - 1];
                    entity.id = prevItem.id + 1;
                }
                entityList.push(entity);
                localStorage.setItem(this.getTableName(), JSON.stringify(entityList));
                LogService.create(e=>{}, 
                    new Log(null, user.email, this.getTableName(), 'CREATE', JSON.stringify(entity))
                );
                callback(entity);
            }
        );
    }

    static modify(user, callback, entity){
        this.getAll(
            entityList =>{
                var index = entityList.findIndex(el => {return el.id == entity.id});
                if(index != -1){
                    entityList[index] = entity;
                    localStorage.setItem(this.getTableName(), JSON.stringify(entityList));
                    LogService.create(e=>{}, 
                        new Log(null, user.email, this.getTableName(), 'MODIFY', JSON.stringify(entity))
                    );
                }
                callback(entity);
            }
        );
    }

    static remove(user, callback, entity){
        this.getAll(
            entityList =>{
                var index = entityList.findIndex(el => {return el.id == entity.id});
                if(index != -1){
                    entityList.splice(index, 1);
                    localStorage.setItem(this.getTableName(), JSON.stringify(entityList));
                    LogService.create(e=>{}, 
                        new Log(null, user.email, this.getTableName(), 'REMOVE', JSON.stringify(entity))
                    );
                }
                callback();
            }
        );
    }
}