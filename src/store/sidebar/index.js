export default {
  namespaced: true,
  state: {
    isShow: false,
    title: '',
    content: 1,
    position: 'left'

  },
  getters: {
    get_sidebarData (state) {
      return {
        isShow: state.isShow,
        title: state.title,
        content: state.content,
        position: state.position
      }
    }
  },
  mutations: {
    set_sidebarData (state, val) {
      state.isShow = val.isShow
      state.title = val.title
      state.content = val.content
      state.position = val.position
    }
  },
  actions: {
  },
  modules: {
  }
}
