<template>
    <div class="container-fluid">
        <nav-bar></nav-bar>
        <div v-if="user">
            {{user}}
        </div>
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

</style>
