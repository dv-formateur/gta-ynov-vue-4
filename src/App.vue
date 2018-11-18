<template>
  <router-view></router-view>
</template>

<script>

export default {
  name: 'app',
  components: {

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
  html, body{
    height: 100%;
  }
  .inline-block{
    display: inline-block;
    vertical-align: top;
  }

  .fade-enter-active, .fade-leave-active {
    transition: all ease .3s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
    height: 0;
  }
</style>
