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
    show_vehicles: []
  },
  getters: {
    get_vehicleTypes (state) {
      return state.vehicleTypes
    },
    get_show_vehicles (state) {
      return state.show_vehicles
    }
  },
  mutations: {
    set_showVehicles (state, vehicles) {
      state.show_vehicles = vehicles
    },
    remove_showVehicles (state, vehicle) {
      state.show_vehicles = state.show_vehicles.filter(item => item.id !== vehicle.id)
    }
  }
}
