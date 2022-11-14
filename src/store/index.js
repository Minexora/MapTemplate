import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import vehicle from './vehicle'
import sidebar from './sidebar'
import createPersistedState from 'vuex-persistedstate'
import Cookies from 'js-cookie'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    vehicle,
    sidebar
  },
  plugins: [
    createPersistedState({
      getState: (key) => Cookies.get(key),
      setState: (key, state) => Cookies.set(key, state, { expires: 3, secure: true })
    })
  ],
  strict: process.env.DEV
})
