import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import MomentVue from "vue-moment"
import VueSession from 'vue-session'

import App from './App.vue'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"


Vue.use(VueSession)
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


