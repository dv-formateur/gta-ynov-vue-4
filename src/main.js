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
import AdminPanel from './pages/AdminPanel.vue'
import NotFound from './pages/NotFound.vue'
import NoPrivilege from './pages/NoPrivilege.vue'

import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';

import User from './entities/user.js';
import Task from './entities/task.js';
import Project from './entities/project.js';
import Contract from './entities/contract.js';

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
      path: '/admin',
      name: 'Admin',
      component: AdminPanel,
      beforeEnter: requireAuth,
      meta: {
          permission: '0'
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

//Data
localStorage.setItem('users',JSON.stringify(
  [new User(1, 'admin', 'admin', 'raphael-charre@hotmail.fr', 0),
  new User(2, 'user2', 'user2', 'test@gmail.com', 1),
  new User(3, 'user3', 'user3', 'test2@gmail.com', 1),
  new User(4, 'user4', 'user4', 'test3@gmail.com', 1),
  new User(5, 'user5', 'user5','test4@gmail.com', 1),
  new User(6, 'user6', 'user6','test5@gmail.com', 1)]
));


localStorage.setItem('projects', JSON.stringify( 
[
  new Project (1, 'prj1', [
  {
      user_id : 1,
      role: 0
  }, 
  {
      user_id : 3,
      role: 2
  }]),
  new Project (2, 'prj2', [
  {
      user_id : 1,
      role: 0
  }, 
  {
      user_id : 2,
      role: 1
  }, 
  {
      user_id : 3,
      role: 2
  }]
  ),
  new Project (3, 'prj3', [
  {
      user_id : 1,
      role: 2
  }, 
  {
      user_id : 2,
      role: 1
  }]),
]
));

localStorage.setItem('tasks', JSON.stringify(
[
  new Task(1, 'task1-1-1', 0, new Date('2018-11-1'), new Date('2018-11-20'), 1, 1, false),
  new Task(2, 'task2-1-1', 1, new Date('2018-11-4'), new Date('2018-11-5'), 1, 1, true),
  new Task(3, 'task3-1-1', 2, new Date('2018-11-8'), new Date('2018-11-15'), 1, 1, true),
  new Task(4, 'task4-1-1', 3, new Date('2018-11-2'), new Date('2018-11-10'), 1, 1, false)
]
));

localStorage.setItem('contracts', JSON.stringify(
[]
));

//GLOBAL METHODS
Vue.prototype.hasRightOnProject = function(project, user){
  return this.isAdmin(user) || 
    project.project_users.filter((e)=>{
      return e.user_id == user.id && e.role <=1
    }).length > 0
}

Vue.prototype.hasRightOnUser = function(source, target){
  return this.isAdmin(source) || source.id == target.id;
}

Vue.prototype.isAdmin = function(user){
  return user.app_role<=0;
}

Vue.prototype.amIAdmin = function(){
  return this.$session.get('user') && this.isAdmin(this.$session.get('user'));
}

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})


