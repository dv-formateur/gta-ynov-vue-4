<template>
<div id="navbar" class="row">
  <b-navbar class="col" toggleable="md" type="dark" variant="info">

  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

  <b-navbar-brand>Ynov Time Management</b-navbar-brand>

  <b-collapse is-nav id="nav_collapse">

    <b-navbar-nav>
      <b-nav-item :to="'/home'">Accueil</b-nav-item>

      <div v-if="$session.get('user')">
        <b-nav-item :to="'/gantt'">Gantt</b-nav-item>
      </div>

      <div v-if="amIAdmin()">
        <b-nav-item :to="'/admin'">Administration</b-nav-item>
      </div>
    </b-navbar-nav>

    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto">
      <b-nav-item-dropdown right v-if="$session.get('user')">
        <!-- Using button-content slot -->
        <template slot="button-content">
          <em>{{$session.get('user').fname}}</em>
        </template>
        <b-dropdown-item @click="$router.push('/profile/' + $session.get('user').id)">Profile</b-dropdown-item>
        <b-dropdown-item @click="logout()">Déconnexion</b-dropdown-item>
      </b-nav-item-dropdown>

      <b-nav-form right v-else>
        <div>
          <b-btn variant="light" block size="sm" class="my-2 my-sm-0 btn" @click="showLogin()">Connexion</b-btn>
        </div>
      </b-nav-form>
    </b-navbar-nav>
  </b-collapse>
</b-navbar>

<b-modal title="Connexion" ref="loginPopin" id="login-popin" hide-footer class="">
  <b-form>
      <b-form-group>
          <b-form-input type="text" name="username" v-model="input.username" placeholder="Username" />
      </b-form-group>

      <b-form-group>
          <b-form-input type="password" name="password" v-model="input.password" placeholder="Password" />
      </b-form-group>
      <button class="btn btn-info" type="button" @click="authenticate(input.username, input.password)">Se connecter</button>
  </b-form>
</b-modal>


</div>
</template>

<script>
import UserService from '../services/user.service'

export default {
  name: "nav-bar",
  props: ['current_page'],
  components: {
  },
  data() {
    return {
      vm: Vue,
      input: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    authenticate(username, password){
      UserService.authenticate(this.login, username, password);
    },
    login(user){
      this.$session.set('user', user);
      this.$refs.loginPopin.hide();
      this.$router.push('/');
      this.$router.go('/');
    },
    logout(){
      this.$session.destroy();
      this.$router.push('/');
      this.$router.go('/');
    },
    showLogin(){
      this.$refs.loginPopin.show();
    }
  }
};
</script>

<style>
#navbar {
  margin-bottom: 25px;
}

#navbar .nav-item .nav-link a a{
  color: white;
}

#navbar .nav-item .nav-link a a:hover{
  color: lightgray;
  text-decoration: none;
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


