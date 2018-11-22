<template>
    <div class="container-fluid">
        <nav-bar></nav-bar>
        <b-card no-body bg-variant="light" class="">
            <b-tabs card>
                <b-tab title="Comptes" class="account-tab" active>
                    <b-form inline>
                        <b-input-group>
                            <b-input id="input-user-lname" v-model="user_form.lname" left="@" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Nom" />
                        </b-input-group>
                        <b-input-group>
                            <b-input id="input-user-fname" v-model="user_form.fname" left="@" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Prenom" />
                        </b-input-group>
                        <b-input-group>
                            <b-input id="input-user-email" type="email" v-model="user_form.email" left="@" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Adresse mail" />
                        </b-input-group>
                        <b-input-group>
                            <input type="checkbox" id="input-user-admin" name="input-user-admin" v-model="user_form.admin" class="mb-2 mr-sm-2 mb-sm-0"/>
                            <label for="input-user-admin">Administrateur</label>
                        </b-input-group>
                            
                        <b-button @click="createUser()" variant="info">Valider</b-button>
                    </b-form>

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
                            <tr v-for="user in users" :key="user.id"  @click="$router.push('/profile/' + user.id)">
                                <th><i v-b-popover.hover="'Administrateur'" v-if="user.app_role<=0" class="fas fa-chess-king text-info"></i></th>
                                <th>{{user.lname}}</th>
                                <th>{{user.fname}}</th>
                                <th>{{user.email}}</th>
                            </tr>
                        </tbody>
                    </table>
                    


                </b-tab>
                <b-tab title="Projets" >
                </b-tab>
                <b-tab title="Contrats" >
                </b-tab>
            </b-tabs>
        </b-card>
    </div>
    
</template>

<script>
import NavBar from '../layout/NavBar.vue'

import UserService from '../services/user.service'
export default {
    components:{
        NavBar
    },
    data(){
        return{
            users: [],
            user_form:{
                lname: '',
                fname: '',
                email: '',
                admin: false
            }
        }
    },
    mounted(){
        UserService.getAll(this.setUsers);
    },
    methods:{
        setUsers(users){
            this.users = users;
        },

        createUser(){
           UserService.createUser(this.user_form.lname, this.user_form.fname, this.user_form.email, this.user_form.admin);
           UserService.getAll(this.setUsers);
        }
    }
    
}
</script>

<style>

</style>
