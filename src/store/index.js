import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    tel: '15302006230',
  },
  mutations: {
    setTel(state, value) {
      state.tel = value
    }
  }
})