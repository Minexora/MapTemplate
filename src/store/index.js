import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import vehicle from './vehicle'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    vehicle
  },
  strict: process.env.DEV
})
