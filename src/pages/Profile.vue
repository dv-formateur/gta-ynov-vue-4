<template>
    <div>
        <nav-bar></nav-bar>
        <div>
            <b-tabs card v-if="user">
                <b-tab title="Compte" class="account-tab col-md-4" active>
                    
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
                <b-tab title="Equipes" class="col-md-4">
                    <div v-for="team in teams" :key="team.id" class="profile-team-row">
                        <p><span class="profile-team-name">{{team.name}}</span> - {{getRoleString(getRole(team))}}</p>
                    </div>
                </b-tab>


                <b-tab v-if="user && hasRightOnUser(amIAuthentified(), user)" title="Contrats" class="col-md-4">
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
                                <div v-for="hour in 2" :key="hour">
                                        <div class="form-group">
                                        <p><span class="font-weight-light">{{selected_contract.hours[day-1][(hour-1)*2]}} - {{selected_contract.hours[day-1][(hour-1)*2+1]}}</span></p>
                                    </div>
                                </div>
                            </b-card>
                            <hr>
                        </div>
                    </div>
                </b-tab>

                <b-tab title="Demandes">
                        <form class="col-md-4">
                            <div class="form-group">
                                <label for="task-name">Titre:</label>
                                <b-input type="text" v-model="input.task.title"></b-input>
                            </div>

                            <div class="form-group">
                                <label for="task-start-date-selector">Date de debut :</label>
                                <b-input type="date" :config="date_picker_options" class="form-control" name="task-start-date-selector" v-model="input.task.date_start"></b-input>
                            </div>

                            <div class="form-group">
                                <label for="task-end-date-selector">Date de fin :</label>
                                <b-input type="date" :config="date_picker_options" class="form-control" name="task-end-date-selector" v-model="input.task.date_end"></b-input>
                            </div>

                            <label for="occupation-selector">Occupation :</label>
                            <select class="form-control" name="occupation-selector" id="occupation-selector" v-model="input.task.occupation_id">
                                <option :value="null">-- Selectionner une occupation --</option>
                                <option v-for="occupation in occupations" v-bind:value="occupation.id" v-bind:key="occupation.id">{{occupation.name}}</option>
                            </select>
                        </form>
                </b-tab>

            </b-tabs>
        </div>
    </div>
</template>

<script>
import UserService from '../services/user.service'
import TeamService from '../services/team.service'
import ContractService from '../services/contract.service'
import TaskService from '../services/task.service'
import OccupationService from '../services/occupation.service'

import Team from '../entities/user'

import NavBar from "../layout/NavBar.vue";
import DatePicker from 'vue-bootstrap-datetimepicker';

export default {
    name: 'profile',
    components: {
        NavBar, DatePicker
    },
    data(){
        return {
            user: null,
            teams: [],

            contracts: [],
            selected_contract: null,

            occupations: [],
            input:{
                task:{
                    title:'',
                    date_start: null,
                    date_end: null,
                    occupation_id: null
                }
            },

            Team: Team
        }
    },
    methods: {
        setUser(user){
            this.user = user;
            TeamService.getUserTeams(this.setTeams, user);
        },
        modifyUser(){
            UserService.modify(this.amIAuthentified(), this.setUser, this.user);
        },

        setContracts(contracts){
            this.contracts = contracts
        },

        setTeams(user, teams){
            this.teams = teams;
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
        },

        setOccupations(occupations){
            this.occupations = occupations;
        }
    },
    mounted(){
        UserService.getUserById(this.setUser, this.$route.params.user_id);
        ContractService.getContractsForUser(this.setContracts, this.user);
        OccupationService.getAll(this.setOccupations);
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
