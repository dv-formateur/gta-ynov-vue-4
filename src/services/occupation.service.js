import DAOService from '../services/dao.service'
export default class ContractService extends DAOService{
    static getTableName(){
        return 'occupations';
    }

    static getTaskOccupation(callback, task){
        super.getById(e=>{
            callback(task, e);
        }, task.occupation_id)
    }
}