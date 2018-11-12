<template>
  <div id="app" class="container-fluid">
    <nav-bar></nav-bar>
    <gantt-view v-if="$session.get('user')" id="gantt-view"></gantt-view>
  </div>
</template>

<script>

import NavBar from './components/NavBar.vue'
import GanttView from './components/GanttView.vue'

export default {
  name: 'app',
  components: {
    NavBar, GanttView
  },
  data () {
    return {
      
    }
  },
  methods: {
    
  }
}
</script>

<style>
</style>
