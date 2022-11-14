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
      10: 'Katamaran',
      1000: 'Hepsi'
    },
    vehicleTypesIcon: {
      0: require('../../assets/images/sedan-white.png'),
      1: require('../../assets/images/pickup-truck-white.png'),
      2: require('../../assets/images/camper-van-white.png'),
      3: require('../../assets/images/truck-white.png'),
      4: require('../../assets/images/safari-white.png'),
      5: require('../../assets/images/motorbike-white.png'),
      6: require('../../assets/images/minivan-white.png'),
      7: require('../../assets/images/school-bus-white.png'),
      8: require('../../assets/images/minibus-white.png'),
      9: require('../../assets/images/boat-white.png'),
      10: require('../../assets/images/catamaran-white.png')
    },
    show_vehicles: [],
    vehicles: []
  },
  getters: {
    get_vehicleTypes (state) {
      return state.vehicleTypes
    },
    get_vehicleTypesIcon (state) {
      return state.vehicleTypesIcon
    },
    get_vehicle (state) {
      return state.vehicles
    },
    get_show_vehicles (state) {
      return state.show_vehicles
    }
  },
  mutations: {
    set_vehicles (state, vehicles) {
      state.vehicles = vehicles
    },
    set_showVehicles (state, vehicles) {
      state.show_vehicles = vehicles
    },
    remove_showVehicles (state, vehicles) {
      state.show_vehicles = vehicles
    }
  }
}
