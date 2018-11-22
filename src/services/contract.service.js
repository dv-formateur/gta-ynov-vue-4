import Contract from '../entities/contract'
export default class ContractService{
    static getContractsForUser(user){
        var contract_id_mult= (user.id);
        var res = [
            new Contract(0, user.id, new Date('01-01-2016'), new Date('01-01-2019')),
            new Contract(1, user.id, new Date('01-01-2016'), new Date('01-01-2019')),
            new Contract(2, user.id, new Date('01-01-2016'), new Date('01-01-2019')),
            new Contract(3, user.id, new Date('01-01-2016'), new Date('01-01-2019')),
        ];

        return res;
    }
}