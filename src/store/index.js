import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    user_telephone: '0000000001',
  },
  mutations: {
    setTel(state, value) {
      state.user_telephone = value
    }
  }
})