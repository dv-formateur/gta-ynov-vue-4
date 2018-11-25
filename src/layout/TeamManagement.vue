<template>
    <div class="row">
        <div class="col-md-3" id="admin-team-selector">
            <div class="form-group">
                <input placeholder="Rechercher une equipe" class="form-control" type="text" v-model="search_team">
            </div>
            <b-list-group>
                <b-list-group-item 
                    button 
                    class="d-flex justify-content-between align-items-center" 
                    @click="selectTeam(team)" 
                    :active="selected_team && selected_team.id==team.id" 
                    v-for="team in teams"
                    v-if="search_team === '' || team.name.includes(search_team)"
                    :key="team.id">

                    {{team.name}}
                    <b-badge variant="info" pill>{{team.team_users.length}}</b-badge>
                </b-list-group-item>
            </b-list-group>
            <p v-if="amIAdmin()" class="text-center"><a v-b-popover.hover="'Creer une equipe'" style="font-size: 24px;" @click="createTeam()" class="fas fa-plus-circle btn text-success"></a></p>
        </div>

        <div class="col" v-if="selected_team">
            <div class="form-group" v-if="has_right_on_selected_team">
                <b-btn variant="success" v-b-popover.hover="'Valider les changements'" @click="modifyTeam(selected_team)">Valider</b-btn>
                <b-btn variant="danger" v-b-popover.hover="'Supprimer l\'équipe'" @click="removeTeam(selected_team)">Supprimer</b-btn>
            </div>

            <hr>

            <div v-if="has_right_on_selected_team" class="form-group">
                <input type="text" class="form-control" placeholder="Nom de l\'équipe" v-model="selected_team.name">
            </div>
            <div v-else>
                <p>{{selected_team.name}}</p>
            </div>
            
            <admin-team-user
                v-for="user in selected_team.team_users" :key="user.user_id"
                :team="selected_team" 
                :team_user="user"
                :has_right_on_team="has_right_on_selected_team"
                class="row team-user-form-container" >
            </admin-team-user>
            <div v-if="has_right_on_selected_team">
                <label for="add-user-to-team-selector">Ajouter un utlisateur: </label>
                <select v-model="add_user_to_team_selector" class="form-control" name="add-user-to-team-selector">
                    <option :value="null">--Selectionner un utilisateur--</option>
                    <option selected v-for="user in users_not_in_team" :key="user.id" :value="user">{{user.fname}} {{user.lname}}</option>
                </select>
                <p class="text-center"><a style="font-size: 48px;" @click="addUserOnTeam()" class="fas fa-plus-circle btn text-success"></a></p>
            </div>

            <hr>
            <div class="form-group" v-if="has_right_on_selected_team">
                <b-btn variant="success" v-b-popover.hover="'Valider les changements'" @click="modifyTeam(selected_team)">Valider</b-btn>
                <b-btn variant="danger" v-b-popover.hover="'Supprimer l\'équipe'" @click="removeTeam(selected_team)">Supprimer</b-btn>
            </div>
            
        </div>
        
    </div>
</template>

<script>
import User from '../entities/user'
import Team from '../entities/team'
import UserService from '../services/user.service'
import TeamService from '../services/team.service';

import AdminTeamUser from '../components/ComponentAdminTeamUser.vue'

export default {
    name: 'team-managenent',
    components: {
        AdminTeamUser
    },
    props: ['teams'],
    data(){
        return{
            users: [],
            search_user: '',
            add_user_to_team_selector: null,
            users_not_in_team: [],
            user_form:{
                lname: '',
                fname: '',
                email: '',
                admin: false
            },

            selected_team: null,
            has_right_on_selected_team: false,
            search_team: '',
            team_form:{

            }
        }
    },
    mounted(){
        UserService.getAll(this.setUsers);
    },
    methods: {
        selectTeam(team){
            this.selected_team = team;
            this.add_user_to_team_selector = null;
            
            this.has_right_on_selected_team = this.hasRightOnTeam(this.selected_team, this.$session.get('user'));

            this.users_not_in_team = this.users.filter(user=>{
                return this.selected_team.team_users.filter(team_user=>{
                    return user.id === team_user.user_id;
                })==0;
            });
        },
        setUsers(users){
            this.users = users;
        },
        createTeam(){
            var team = new Team(null, 'default-name');
            TeamService.create(this.onCreateTeam, team);
        },
        onCreateTeam(team){
            this.$emit('onCreateTeam', team);
            this.selected_team = team;
        },
        addUserOnTeam(){
            if(this.selected_team.team_users){
                this.selected_team.team_users.push({
                    user_id: this.add_user_to_team_selector.id,
                    role: 2
                });
                this.selectTeam(this.selected_team);
            }
            
        },
        modifyTeam(team){
            TeamService.modify(this.onModifyTeam, team);
        },
        onModifyTeam(team){
        },

        removeTeam(team){
            TeamService.remove(this.onRemoveTeam, team);
        },
        onRemoveTeam(){
            TeamService.getAll(this.setTeams);
            this.selected_team = null;
        }
    }
}
</script>

<style>
    #admin-team-selector{
        margin-bottom: 20px;
    }

    .team-user-form-container{
        margin-bottom: 20px;
        border: 1px solid lightgray;
        border-radius: 5px;
        padding: 20px;
        background-color: white
    }
</style>
