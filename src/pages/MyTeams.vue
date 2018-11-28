<template>
    <div>
        <nav-bar></nav-bar>
        <div class="container-fluid page">
            <team-management 
                :teams="teams"
                @onCreateTeam="onCreateTeam">
            </team-management>
        </div>
    </div>
</template>

<script>
import NavBar from '../layout/NavBar.vue'
import TeamManagement from '../layout/TeamManagement.vue'

import TeamService from '../services/team.service';
export default {
    components: {
        NavBar, TeamManagement
    },
    data(){
        return {
            teams: []
        }
    },
    mounted(){
        TeamService.getUserTeams(this.setTeams, this.$session.get('user'), this.amIAdmin());
    },
    methods: {
        setTeams(user, teams){
            this.teams = teams;
        },
        onCreateTeam(team){
            TeamService.getAll(this.setTeams);
        },
    }
}
</script>

<style>

</style>
