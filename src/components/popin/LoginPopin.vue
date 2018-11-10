<template>
    <b-modal id="login-popin">
        <h1>Connexion</h1>
        <form class="">
            <b-form-group>
                <label for="username">Nom d'utilisateur</label>
                <b-form-input type="text" name="username" v-model="input.username" placeholder="Username" />
            </b-form-group>

            <b-form-group>
                <label for="username">Mot de passe</label>
                <b-form-input type="password" name="password" v-model="input.password" placeholder="Password" />
            </b-form-group>
            <button class="btn btn-info" type="button" v-on:click="login()">Login</button>
        </form>
        
    </b-modal>
</template>

<script>
export default {
    name: 'login-popin',
    props: [],
    data () {
        return {
            input: {
                username: '',
                password: ''
            }
        }
    },
    methods:{}    
}
</script>

<style>
    #login {
        width: 500px;
        border: 1px solid #CCCCCC;
        background-color: #FFFFFF;
        margin: auto;
        margin-top: 200px;
        padding: 20px;
    }

</style>
