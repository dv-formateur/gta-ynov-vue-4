import DAOService from './dao.service';
export default class ContractService extends DAOService{
    static getTableName(){
        return 'contracts';
    }

    static getContractsForUser(callback, user){
        super.getAll(entities =>{
            entities = entities.filter(e=>{
                return e.user_id == user.id;
            })
            callback(entities, user);
        });
    }
}