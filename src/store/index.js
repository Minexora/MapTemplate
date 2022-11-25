import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import vehicle from './vehicle'
import sidebar from './sidebar'
// import createPersistedState from 'vuex-persistedstate'
// import SecureLS from 'secure-ls'
// const ls = new SecureLS({ isCompression: false })

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    vehicle,
    sidebar
  },
  plugins: [
    // createPersistedState({
    //   storage: window.sessionStorage
    // })
  ],
  strict: process.env.DEV
})
