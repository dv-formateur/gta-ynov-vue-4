<template>
  <div id="app" class="container-fluid">
    <nav-bar 
      v-bind:current_page="current_page"
      @changePage="changePage">
    </nav-bar>

    <home-page 
      v-if="current_page=='home'">
    </home-page>

    <gantt-view 
      v-if="$session.get('user') && 
      current_page=='gantt'" id="gantt-view">
    </gantt-view>



  </div>
</template>

<script>

import NavBar from './components/NavBar.vue'
import HomePage from './components/HomePage.vue'
import GanttView from './components/GanttView.vue'

export default {
  name: 'app',
  components: {
    NavBar, HomePage, GanttView
  },
  data () {
    return {
      current_page: 'home',
    }
  },
  methods: {
    changePage(page){
      this.current_page = page;
    }
  }
}
</script>

<style>
</style>
