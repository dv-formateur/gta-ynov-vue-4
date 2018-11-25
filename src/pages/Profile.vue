<template>
    <div class="container-fluid">
        <div id="bg-image"></div>
        <nav-bar></nav-bar>
        <b-card no-body bg-variant="light" v-if="user" id="account-tabs-card" class="col-md-12 col-xl-4">
            <b-tabs card>
                <b-tab title="Compte" class="account-tab" active>
                    

                    <!-- user info -->
                    <div v-if="$session.get('user') && hasRightOnUser($session.get('user'), user)">
                        <b-form>
                            <div class="form-group">
                                <label for="form-profile-user-fname">Prénom: </label>
                                <input type="text" class="form-control" id="form-profile-user-fname" v-model="user.fname" required/>
                            </div>
                            <div class="form-group">
                                <label for="form-profile-user-lname">Nom: </label>
                                <input type="text" class="form-control" id="form-profile-user-lname" v-model="user.lname" required/>
                            </div>
                            <div class="form-group">
                                <label for="form-profile-user-email">Adresse mail: </label>
                                <input type="mail" class="form-control" id="form-profile-user-email" v-model="user.email" required/>
                            </div>

                            <div class="form-group">
                                <label for="form-profile-user-bdate">Date de naissance: </label>
                                <input type="date" class="form-control" id="form-profile-user-bdate" v-model="user.bdate"/>
                            </div>

                            <div class="form-group">
                                <label for="form-profile-user-address">Adresse: </label>
                                <input type="text" class="form-control" id="form-profile-user-address" v-model="user.address"/>
                            </div>

                            <div class="form-group">
                                <label for="form-profile-user-phone">Téléphone: </label>
                                <input type="text" class="form-control" id="form-profile-user-phone" v-model="user.phone"/>
                            </div>
                        </b-form>

                        <b-btn @click="modifyUser" variant="success">Valider</b-btn>
                    </div>

                    <div v-else>
                        <p>Nom : <span class="font-weight-light">{{user.lname}}</span></p>
                        <p>Prénom : <span class="font-weight-light">{{user.fname}}</span></p>

                        <div v-if="amIAuthentified()">
                            <p>Email : <span class="font-weight-light">{{user.email}}</span></p>
                            <p>Date de naissance : <span class="font-weight-light">{{ user.bdate ? $moment(user.bdate).format('DD/MM/YYYY') : '--/--/----'}}</span></p>
                            <p>Adresse : <span class="font-weight-light">{{user.address}}</span></p>
                            <p>Téléphone : <span class="font-weight-light">{{user.phone}}</span></p>
                        </div>
                        <div v-else>
                            <em class="text-danger">Pour plus d'information veuillez vous authentifier.</em>
                        </div>
                    </div>

                </b-tab>
                <b-tab title="Equipes" >
                    <div v-for="team in teams" :key="team.id" class="profile-team-row">
                        <p><span class="profile-team-name">{{team.name}}</span> - {{getRoleString(getRole(team))}}</p>
                    </div>
                </b-tab>


                <b-tab v-if="user && hasRightOnUser(amIAuthentified(), user)" title="Contrats" >
                    <div class="form-group">
                        <label for="occupation-selector">Contrat: </label>
                        <select class="form-control" name="contract-selector" v-model="selected_contract">
                            <option :value="null">-- Selectionner un contrat --</option>
                            <option v-for="contract in contracts" :key="contract.id" :value="contract">{{contract.motif}}</option>
                        </select>
                    </div>

                    <hr>

                    <div v-if="selected_contract">
                        <div>
                            <p>Motif: <span class="font-weight-light">{{selected_contract.motif}}</span></p>
                            <p>Date de début: <span class="font-weight-light">{{$moment(selected_contract.dateStart).format('DD-MM-YYYY')}}</span></p>
                            <p>Date de fin: <span class="font-weight-light">{{$moment(selected_contract.dateEnd).format('DD-MM-YYYY')}}</span></p>

                        </div>

                        <hr>
                    
                        <div v-for="day in 7" :key="day">
                            <b-card
                                :header="$moment().day(day).format('dddd')">
                                <div v-for="hour in 4" :key="hour">
                                        <div class="form-group">
                                        <input 
                                            type="time" 
                                            class="form-control" 
                                            v-model="selected_contract.hours[day-1][hour-1]" required/>
                                    </div>
                                </div>
                            </b-card>
                            <hr>
                        </div>
                    </div>
                </b-tab>
            </b-tabs>
        </b-card>
    </div>
</template>

<script>
import UserService from '../services/user.service'
import TeamService from '../services/team.service'
import ContractService from '../services/contract.service'

import Team from '../entities/user'

import NavBar from "../layout/NavBar.vue";

export default {
    name: 'profile',
    components: {
        NavBar
    },
    data(){
        return {
            user: null,
            teams: [],

            contracts: [],
            selected_contract: null,

            Team: Team
        }
    },
    methods: {
        setUser(user){
            this.user = user;
            TeamService.getUserTeams(this.setTeams, user);
        },
        setContracts(contracts){
            this.contracts = contracts
        },
        setTeams(user, teams){
            this.teams = teams;
        },
        modifyUser(){
            UserService.modify(this.setUser, this.user);
        },
        getRole(team){
            var res = 2;
            var user = this.$session.get('user');
            for(var usr of team.team_users){
                if(usr.user_id === user.id){
                    res = usr.role;
                    break;
                }
            }
            return res;
        }
    },
    mounted(){
        UserService.getUserById(this.setUser, this.$route.params.user_id);
        ContractService.getContractsForUser(this.setContracts, this.user);
    }
}
</script>

<style>
    .profile-team-name{
        font-size: 2em;
        color: deepskyblue;
    }

    #account-tabs-card{
        min-height: 300px;
        padding: 0px;
    }

    .account-tab{
        padding: 20px 20px;
    }
</style>
