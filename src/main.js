import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import './js/rem'
import store from '@/store/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
axios.defaults.withCredentials = true;
Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(ElementUI);
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
