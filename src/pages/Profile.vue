<template>
    <div class="container-fluid">
        <div id="bg-image"></div>
        <nav-bar></nav-bar>
        <b-card no-body bg-variant="light" v-if="user" id="account-tabs-card" class="col-md-12 col-xl-4">
            <b-tabs card>
                <b-tab title="Compte" class="account-tab" active>
                    <p>Nom : <span class="font-weight-light">{{user.lname}}</span></p>
                    <p>Prénom : <span class="font-weight-light">{{user.fname}}</span></p>

                    <!-- user info -->
                    <div v-if="$session.get('user') && hasRightOnUser($session.get('user'), user)">
                        <b-form>
                            <b-input-group>
                                <b-input id="form-profile-user-email" v-model="user.email" placeholder="Adresse email" required></b-input>
                            </b-input-group>
                        </b-form>

                        <b-btn variant="success">Valider</b-btn>
                    </div>

                    <div v-else>
                        <p>Email : <span class="font-weight-light">{{user.email}}</span></p>
                    </div>

                    <!-- default planning -->
                    <div v-if="amIAdmin()">

                    </div>
                    <div v-else>

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
