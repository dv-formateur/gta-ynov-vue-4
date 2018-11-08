import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import MomentVue from "vue-moment"

import App from './App.vue'
import NavBar from './components/NavBar.vue'
import MonthView from './components/MonthView.vue'
import GanttView from './components/GanttView.vue'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

Vue.use(BootstrapVue)
Vue.use(MomentVue)

Vue.moment.locale('fr', {
  week: {
      dow: 1
  }
});
Vue.moment.locale('fr');



new Vue({
  el: '#app',
  render: h => h(App)
})

new Vue({
  el: '#nav-bar',
  render: h => h(NavBar),
})

new Vue({
  el: '#month-view',
  render: h => h(MonthView),
})

new Vue({
  el: '#gantt-view',
  render: h => h(GanttView),
})

