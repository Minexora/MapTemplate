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
      11: 'Saat',
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
      10: require('../../assets/images/catamaran-white.png'),
      11: require('../../assets/images/wristwatch.png')
    },
    show_vehicles: [],
    waypoints: [],
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
    get_waypoints (state) {
      return state.waypoints
    },
    get_show_and_play (state) {
      return state.show_vehicles
    },
    get_show_vehicles (state) {
      return state.show_vehicles
    }
  },
  mutations: {
    set_vehicles (state, vehicles) {
      state.vehicles = vehicles
    },
    set_way_points (state, waypoints) {
      state.waypoints = waypoints
    },
    set_showVehicles (state, vehicles) {
      state.show_vehicles = vehicles
    },
    set_last_location (state, _vehicle) {
      const vehicle = state.show_vehicles.find(item => item.imei === _vehicle.imei)
      state.show_vehicles = state.show_vehicles.filter(item => item.imei !== _vehicle.imei)
      if (vehicle) {
        vehicle.lat = _vehicle.location.lat
        vehicle.lng = _vehicle.location.lng
      }
      state.show_vehicles.push(vehicle)
    },
    remove_showVehicles (state, vehicles) {
      state.show_vehicles = vehicles
    },
    remove_way_points (state, imei) {
      delete state.waypoints[imei]
    }
  }
}
