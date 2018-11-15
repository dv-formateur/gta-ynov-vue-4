<template>
    <div class="row">
        <div class="col-8">
            Info
        </div>

        <div v-if="!$session.get('user')" class="col-4">
            <b-card 
                bg-variant="light"
                header="Inscription">
                 <b-form-group
                    label="Email :"
                    label-for="email">
                    <b-form-input type="email" id="email" v-model.trim="input.email" required></b-form-input>
                </b-form-group>

                <b-form-group
                    label="Prenom :"
                    label-for="fname">
                    <b-form-input type="text" id="fname" v-model.trim="input.fname" required></b-form-input>
                </b-form-group>

                <b-form-group
                    label="Nom :"
                    label-for="lname">
                    <b-form-input type="text" id="lname" v-model.trim="input.lname" required></b-form-input>
                </b-form-group>

                <b-form-group
                    label="Mot de passe :"
                    label-for="password">
                    <b-form-input type="password" id="password" v-model.trim="input.password" required></b-form-input>
                </b-form-group>

                <b-form-group
                    label="Confirmation :"
                    label-for="confirm">
                    <b-form-input type="password" id="confirm" v-model.trim="input.confirm" required></b-form-input>
                </b-form-group>

                <button class="btn btn-info" type="button">Inscription !</button>

            </b-card>
        </div>
    </div>
    
</template>

<script>
export default {
    name: 'home-page',
    data () {
        return {
            input:{
                email: ''
            }
        }
    },
    methods: {

    }
}
</script>


<style>

</style>
