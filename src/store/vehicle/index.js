export default {
  namespaced: true,
  state: {
    vehicleTypes: {
      0: 'Binek',
      1: 'PickUp',
      2: 'Kamyonet',
      3: 'Kamyon',
      4: 'Safari',
      5: 'Motor',
      6: 'Minivan',
      7: 'Otobüs',
      8: 'Minibüs',
      9: 'Boat',
      10: 'Katamaran'
    },
    userId: '',
    userType: '',
    token: ''
  },
  getters: {
    get_vehicleTypes (state) {
      return state.vehicleTypes
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
}
