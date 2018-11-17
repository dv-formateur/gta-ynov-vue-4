<template>
    <div id="home-page">
        <div id="bg-image"></div>
        <div class="container-fluid">
            <nav-bar></nav-bar>

            <div class="row">
                <div class="col-8">
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
        </div>
    </div>
</template>

<script>
import NavBar from "../layout/NavBar.vue";
export default {
  name: "home-page",
  components:{
      NavBar
  },
  data() {
    return {
      input: {
        email: ""
      }
    };
  },
  methods: {}
};
</script>


<style>
#home-page{
    height: 100%; 
}
#bg-image{
    position: fixed;
  left: 0;
  right: 0;
  z-index: 0;

  display: block;
    background-image: url('../img/home_bg.jpg');
    /* Add the blur effect */
    filter: blur(8px);
    -webkit-filter: blur(8px);

    /* Full height */
    height: 100%; 

    /* Center and scale the image nicely */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}
</style>
