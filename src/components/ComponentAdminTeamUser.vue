<template>
    <div class="row team-user-form-container" v-if="user">
        <div v-if="has_right_on_team" class="col-1">
                <a @click="removeUserFromTeam" 
                    class="fas fa-times-circle btn text-danger"
                    v-b-popover.hover="'Supprimer l\'utilisateur'"></a>
        </div>
        <form class="col">
            <p><span class="font-weight-bold">Email:</span> {{user.email}}</p>
            <p><span class="font-weight-bold">Nom:</span> {{user.fname}} {{user.lname}}</p>
            <label :for="'user_role_'+user.id" class="font-weight-bold">Role:</label>
            <select :disabled="!has_right_on_team"  v-model="team_user.role" :name="'user_role_'+user.id" class="form-control">
                <option value="1">Manager</option>
                <option value="2">Standard</option>
            </select>
        </form>
    </div>
</template>

<script>
import UserService from '../services/user.service'

export default {
    name: 'admin-team-user',
    props:['team_user', 'team', 'has_right_on_team'],
    data(){
        return{
            user: null
        }
    },
    methods:{
        setUserOnTeam(user){
            this.user = user;
        },
        removeUserFromTeam(){
            let toFind = this.team_user;
            var index = this.team.team_users.findIndex(e =>{
                return e.user_id === toFind.user_id;
            })
            if(index != -1){
                this.team.team_users.splice(index, 1);
            }
        },
        changeRole(){
            this.$emit('change', this.team);
        }
    },
    mounted(){
        UserService.getUserById(this.setUserOnTeam, this.team_user.user_id);
    }
}
</script>

<style>

</style>
