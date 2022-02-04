import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    tel: ''
  },
  mutations: {
    setTel(state, value) {
      state.tel = value
    }
  }
})