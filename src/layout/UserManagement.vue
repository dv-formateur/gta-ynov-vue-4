<template>
    <div>
        <div>
            <p>Ajouter un utilisateur: </p>
            <b-form inline class="form-group">
                <b-input-group class="form-group">
                    <b-input id="input-user-lname" v-model="user_form.lname" left="@" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Nom" />
                </b-input-group>
                <b-input-group class="form-group">
                    <b-input id="input-user-fname" v-model="user_form.fname" left="@" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Prenom" />
                </b-input-group>
                <b-input-group class="form-group">
                    <b-input id="input-user-email" type="email" v-model="user_form.email" left="@" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Adresse mail" />
                </b-input-group>
                <b-input-group class="form-group">
                    <input type="checkbox" id="input-user-admin" name="input-user-admin" v-model="user_form.admin" class="mb-2 mr-sm-2 mb-sm-0"/>
                    <label for="input-user-admin">Administrateur</label>
                </b-input-group>
            </b-form>
            <b-button v-b-popover.hover="'Creer l\'utilisateur'" @click="createUser()" variant="info">Valider</b-button>
        </div>

        <hr/>

        <div class="form-group">
            <input placeholder="Rechercher un utilisateur" class="form-control" type="text" v-model="search_user">
        </div>

        <table class="table table-responsive-sm table-striped table-hover">
            <thead>
                <tr>
                    <th>Roles</th>
                    <th>Nom</th>
                    <th>Prenom</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="search_user === '' || user.fname.includes(search_user) || user.lname.includes(search_user) || user.email.includes(search_user)" v-for="user in users" :key="user.id"  @click="$router.push('/profile/' + user.id)">
                    <td><i v-b-popover.hover="'Administrateur'" v-if="user.app_role<=0" class="fas fa-chess-king text-info"></i></td>
                    <td>{{user.lname}}</td>
                    <td>{{user.fname}}</td>
                    <td>{{user.email}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import User from '../entities/user'
import UserService from '../services/user.service'
export default {
    name: 'user-management',
    data() {
        return {
            users: [],
            search_user: '',
            user_form:{
                lname: '',
                fname: '',
                email: '',
                admin: false
            },
        }
    },
    methods: {
        setUsers(users){
            this.users = users;
        },
        createUser(){
            var user = new User(null, this.user_form.lname, this.user_form.fname, this.user_form.email, this.user_form.admin? 0 : 1);
            UserService.create(this.onCreateUser, user) 
        },
        onCreateUser(user){
            UserService.getAll(this.setUsers);
        },
    },
    mounted(){
        UserService.getAll(this.setUsers);
    }
}
</script>

<style>

</style>
