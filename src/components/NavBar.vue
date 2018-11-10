<template>
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
          <em>User</em>
        </template>
        <b-dropdown-item href="#">Profile</b-dropdown-item>
        <b-dropdown-item href="#">Signout</b-dropdown-item>
      </b-nav-item-dropdown>

      <b-nav-form right v-else>
        <div>
          <b-btn size="sm" class="my-2 my-sm-0 btn" v-b-modal.login-popin>Connexion</b-btn>
        </div>
      </b-nav-form>
    </b-navbar-nav>

  </b-collapse>
</b-navbar>

<!-- navbar-1.vue -->
</template>

<script>
export default {
  name: "nav-bar",
  data() {
    return {};
  },
  methods: {}
};
</script>

<style>
#app-menu {
  z-index: 10;
  left: 0;
  top: 0;
}
</style>


