import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import MomentVue from "vue-moment"
import VueSession from 'vue-session'
import VueRouter from 'vue-router'

import App from './App.vue'
import Home from './pages/Home.vue'
import Gantt from './pages/Gantt.vue'
import Profile from './pages/Profile.vue'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

Vue.use(VueRouter)
Vue.use(VueSession)
Vue.use(BootstrapVue)
Vue.use(MomentVue)

Vue.moment.locale('fr', {
  week: {
      dow: 1
  }
});
Vue.moment.locale('fr');

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: '',
      component: Home
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/gantt',
      name: 'Gantt',
      component: Gantt
    },
    {
      path: '/profile/:user_id',
      name: 'Profile',
      component: Profile
    }
  ]
})



new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})


