export default {
  namespaced: true,
  state: {
    username: '',
    userId: '',
    userType: '',
    token: ''
  },
  getters: {
    get_username (state) {
      return state.username
    },
    get_userId (state) {
      return state.userId
    },
    get_userType (state) {
      return state.userType
    },
    get_token (state) {
      return state.token
    }
  },
  mutations: {
    set_username (state, val) {
      state.username = val
    },
    set_userId (state, val) {
      state.userId = val
    },
    set_userType (state, val) {
      state.userType = val
    },
    set_token (state, val) {
      state.token = val
    }
  },
  actions: {
  },
  modules: {
  }
}
