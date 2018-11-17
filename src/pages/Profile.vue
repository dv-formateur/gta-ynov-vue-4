<template>
    <div class="container-fluid">
        <div id="bg-image"></div>
        <nav-bar></nav-bar>
        <b-card no-body bg-variant="light" v-if="user" id="account-tabs-card" class="col-xl-4">
            <b-tabs card>
                <b-tab title="Compte" class="account-tab" active>
                    <p>Nom d'utilisateur : <span class="font-weight-light">{{user.name}}</span></p>

                    <div v-if="user.id == $session.get('user').id">
                        <p>Email : <span class="font-weight-light">{{user.email}}</span></p>
                    </div>
                </b-tab>
                <b-tab title="Projets" >
                    <br>I'm the second tab content
                </b-tab>
                <b-tab title="Contrats" >
                    <br>I'm the second tab content
                </b-tab>
            </b-tabs>
        </b-card>
    </div>
</template>

<script>
import UserService from '../services/user.service'

import NavBar from "../layout/NavBar.vue";

export default {
    name: 'profile',
    components: {
        NavBar
    },
    data(){
        return {
            user: null
        }
    },
    methods: {
        setUser(user){
            this.user = user;
        }
    },
    mounted(){
        UserService.getUserById(this.setUser, this.$route.params.user_id);
    }
}
</script>

<style>
    #account-tabs-card{
        min-height: 300px;
        padding: 0px;
    }

    .account-tab{
        padding: 20px 20px;
    }
</style>
