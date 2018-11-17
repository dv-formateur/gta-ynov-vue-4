import Vue from 'vue'
import datePicker from 'vue-bootstrap-datetimepicker';
import BootstrapVue from "bootstrap-vue"
import MomentVue from "vue-moment"
import VueSession from 'vue-session'
import VueRouter from 'vue-router'

import App from './App.vue'
import Home from './pages/Home.vue'
import Gantt from './pages/Gantt.vue'
import Profile from './pages/Profile.vue'

import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';

Vue.use(VueRouter)
Vue.use(VueSession)
Vue.use(BootstrapVue)
Vue.use(MomentVue)
Vue.use(datePicker)

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

jQuery.extend(true, jQuery.fn.datetimepicker.defaults, {
  icons: {
    time: 'far fa-clock',
    date: 'far fa-calendar',
    up: 'fas fa-arrow-up',
    down: 'fas fa-arrow-down',
    previous: 'fas fa-chevron-left',
    next: 'fas fa-chevron-right',
    today: 'fas fa-calendar-check',
    clear: 'far fa-trash-alt',
    close: 'far fa-times-circle'
  }
});

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})


