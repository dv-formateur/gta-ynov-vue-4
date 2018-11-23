<template>
    <div class="row project-user-form-container" v-if="user">
        <div class="col-1">
                <a @click="removeUserFromProject" 
                    class="fas fa-times-circle btn text-danger"
                    v-b-popover.hover="'Supprimer l\'utilisateur'"></a>
        </div>
        <form class="col">
            <p><span class="font-weight-bold">Email:</span> {{user.email}}</p>
            <p><span class="font-weight-bold">Nom:</span> {{user.fname}} {{user.lname}}</p>
            <label :for="'user_role_'+user.id" class="font-weight-bold">Role:</label>
            <select v-model="project_user.role" :name="'user_role_'+user.id" class="form-control">
                <option value="1">Manager</option>
                <option value="2">Standard</option>
            </select>
        </form>
    </div>
</template>

<script>
import UserService from '../services/user.service'

export default {
    name: 'admin-project-user',
    props:['project_user', 'project'],
    data(){
        return{
            user: null
        }
    },
    methods:{
        setUserOnProject(user){
            this.user = user;
        },
        removeUserFromProject(){
            let toFind = this.project_user;
            var index = this.project.project_users.findIndex(e =>{
                return e.user_id === toFind.user_id;
            })
            if(index != -1){
                this.project.project_users.splice(index, 1);
            }
        },
        changeRole(){
            this.$emit('change', this.project);
        }
    },
    mounted(){
        UserService.getUserById(this.setUserOnProject, this.project_user.user_id);
    }
}
</script>

<style>

</style>
