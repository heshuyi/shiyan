import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'vant/lib/index.css'
import axios from 'axios'
import './js/rem'
import Vant from 'vant'
import store from '@/store/index'
import webSockets from './js/webSockets'
axios.defaults.withCredentials = true;
Vue.use(Vant)
Vue.prototype.$http = axios

Vue.prototype.$webSockets = webSockets

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
