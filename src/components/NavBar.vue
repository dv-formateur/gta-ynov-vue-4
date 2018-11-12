<template>
<div>
  <b-navbar id="app-menu" class="position-fixed col" toggleable="md" type="dark" variant="info">

  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

  <b-navbar-brand href="#">Ynov Time Management</b-navbar-brand>

  <b-collapse is-nav id="nav_collapse">

    <b-navbar-nav>
      <b-nav-item href="#">Link</b-nav-item>
    </b-navbar-nav>

    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto">
      <b-nav-item-dropdown right v-if="$session.get('user')">
        <!-- Using button-content slot -->
        <template slot="button-content">
          <em>{{$session.get('user').name}}</em>
        </template>
        <b-dropdown-item href="#">Profile</b-dropdown-item>
        <b-dropdown-item href="#" @click="logout()">Déconnexion</b-dropdown-item>
      </b-nav-item-dropdown>

      <b-nav-form right v-else>
        <div>
          <b-btn block size="sm" class="my-2 my-sm-0 btn" @click="showLogin()">Connexion</b-btn>
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
  components: {
  },
  data() {
    return {
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
      this.$parent.$forceUpdate();
      this.$forceUpdate();
    },
    logout(){
      this.$session.destroy();
      this.$parent.$forceUpdate();
      this.$forceUpdate();
    },
    showLogin(){
      this.$refs.loginPopin.show();
    }
  }
};
</script>

<style>
#app-menu {
  z-index: 10;
  left: 0;
  top: 0;
}
</style>


