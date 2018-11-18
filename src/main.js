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
import NotFound from './pages/NotFound.vue'
import NoPrivilege from './pages/NoPrivilege.vue'

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


//ROUTER
const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: '',
      component: Home,
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
    },
    {
      path: '/gantt',
      name: 'Gantt',
      component: Gantt,
      beforeEnter: requireAuth,
      meta: {
          permission: '2'
      }
    },
    {
      path: '/profile/:user_id',
      name: 'Profile',
      component: Profile,
    },
    {
      path: '/noprivilege',
      name: 'No Privilege',
      component: NoPrivilege,
    },
    {
      path: '*',
      name: 'Not Found',
      component: NotFound,
    }
  ]
})

function requireAuth(to, from, next){
    var session = router.app.$session;
    var current_role = session.get('user') ? session.get('user').app_role : 3;
    if(current_role <= to.meta.permission){
      next();
    }else{
      next('/noprivilege');
    }  
}


//JQuery
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


