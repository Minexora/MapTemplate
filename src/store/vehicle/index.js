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

    vehicleTypesIconBlc: {
      0: require('../../assets/images/sedan.png'),
      1: require('../../assets/images/pickup-truck-black.png'),
      2: require('../../assets/images/camper-van.png'),
      3: require('../../assets/images/truck.png'),
      4: require('../../assets/images/safari.png'),
      5: require('../../assets/images/motorbike.png'),
      6: require('../../assets/images/minivan.png'),
      7: require('../../assets/images/school-bus.png'),
      8: require('../../assets/images/minibus.png'),
      9: require('../../assets/images/boat.png'),
      10: require('../../assets/images/catamaran.png'),
      11: require('../../assets/images/wristwatch.png')
    },
    vehicleTypesIconRed: {
      0: require('../../assets/images/sedan-red.png'),
      1: require('../../assets/images/pickup-truck-red.png'),
      2: require('../../assets/images/camper-van-red.png'),
      3: require('../../assets/images/truck-red.png'),
      4: require('../../assets/images/safari-red.png'),
      5: require('../../assets/images/motorbike-red.png'),
      6: require('../../assets/images/minivan-red.png'),
      7: require('../../assets/images/school-bus-red.png'),
      8: require('../../assets/images/minibus-red.png'),
      9: require('../../assets/images/boat-red.png'),
      10: require('../../assets/images/catamaran-red.png'),
      11: require('../../assets/images/wristwatch-red.png')
    },
    show_vehicles: [],
    waypoints: [],
    vehicles: [],
    intervals: [],
    history_date_range: {
      end: null,
      start: null
    },
    vehicle_list_for_report: [],
    vehicle_selected_for_report: null,
    report_type: null
  },
  getters: {
    get_vehicleTypes (state) {
      return state.vehicleTypes
    },
    get_vehicleTypesIcon (state) {
      return state.vehicleTypesIcon
    },
    get_vehicleTypesIconBlc (state) {
      return state.vehicleTypesIconBlc
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
    },
    get_intervals (state) {
      return state.intervals
    },
    get_history_date_range (state) {
      return state.history_date_range
    },
    get_vehicle_list_for_report (state) {
      return state.vehicle_list_for_report
    },
    get_vehicle_selected_for_report (state) {
      return state.vehicle_selected_for_report
    },
    get_report_type (state) {
      return state.report_type
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
    set_intervals (state, intervals) {
      state.intervals = intervals
    },
    set_last_location (state, _vehicle) {
      const vehicle = state.show_vehicles.find(item => item.imei === _vehicle.imei)
      state.show_vehicles = state.show_vehicles.filter(item => item.imei !== _vehicle.imei)
      if (vehicle) {
        vehicle.lat = _vehicle.location.lat
        vehicle.lng = _vehicle.location.lng
        vehicle.coordinates[0].rotation = _vehicle.rotation
        vehicle.speed = _vehicle.speed
        vehicle.distance = _vehicle.distance
        vehicle.coordinates[0].insidePolygon = _vehicle.insidePolygon
        vehicle.coordinates[0].batteryPercent = _vehicle.ignition
        vehicle.lastData = _vehicle.date
      }
      state.show_vehicles.push(vehicle)
    },
    remove_way_points (state, imei) {
      state.waypoints = state.waypoints.filter(item => item.imei !== imei)
    },
    set_history_date_range (state, val) {
      state.history_date_range.end = val.end
      state.history_date_range.start = val.start
    },
    set_vehicle_list_for_report (state, val) {
      state.vehicle_list_for_report = val
    },
    set_vehicle_selected_for_report (state, val) {
      state.vehicle_selected_for_report = val
    },
    set_report_type (state, val) {
      state.report_type = val
    }
  }
}
