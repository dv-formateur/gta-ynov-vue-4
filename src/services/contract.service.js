import Contract from '../entities/contract'
export default class ContractService{
    static getContractsForUser(user){
        var contract_id_mult= (user.id + 1);
        var res = [
            new Contract(contract_id_mult * contract_id_mult, 'contract1-'+user.id, new Date('01-01-2016'), new Date('01-01-2019')),
            new Contract(contract_id_mult * contract_id_mult, 'contract2-'+user.id, new Date('01-01-2016'), new Date('01-01-2019')),
            new Contract(contract_id_mult * contract_id_mult, 'contract3-'+user.id, new Date('01-01-2016'), new Date('01-01-2019')),
            new Contract(contract_id_mult * contract_id_mult, 'contract4-'+user.id, new Date('01-01-2016'), new Date('01-01-2019')),
        ];

        return res;
    }
}