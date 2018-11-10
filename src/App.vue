<template>
  <div id="app" class="container-fluid">

    <login-popin title="Connexion"></login-popin>
    <nav-bar></nav-bar>
    <gantt-view v-if="!$session.get('user')" id="gantt-view"></gantt-view>
  </div>
</template>

<script>

import NavBar from './components/NavBar.vue'
import GanttView from './components/GanttView.vue'
import LoginPopin from './components/popin/LoginPopin.vue'

export default {
  name: 'app',
  components: {
    NavBar, GanttView, LoginPopin
  },
  data () {
    return {
      
    }
  },
  methods: {
    login(user){
      this.$session.set('user', user);
    },
    logout(){
      this.$session.destroy();
    }
  }
}
</script>

<style>
</style>
