<template>
  <div>
    <Map :center="map_center" :locations="map_locations" :waypoints="waypoints" :showMap="showMap" :zoom="map_zoom" />
    <b-sidebar />
    <l-history-tracking :historyTracking="show_waypoints"/>
  </div>
</template>

<script>
import Map from '@/components/Map/Map.vue'
import Sidebar from '@/components/Sidebar/SideComponent.vue'
import { latLng } from 'leaflet'
import useJwt from '@/auth/jwt/useJwt'
import endpoints from '@/@core/auth/jwt/jwtDefaultConfig'
import HistoryTracking from '@/components/Map/HistoryTracking.vue'
export default {
  name: 'HomeView',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Map,
    'l-history-tracking': HistoryTracking,
    'b-sidebar': Sidebar
  },
  data () {
    return {
      map_center: latLng(18.436396666666667, -68.86388333333332),
      map_zoom: 13,
      default_tooltip_vehice: {
        id: 2,
        marker: latLng(47.41422, -1.250482),
        popup: false,
        tooltip: true,
        popup_data: {},
        tooltip_data: {
          title: 'I am a tooltip',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sed pretium nisl, ut sagittis sapien. Sed vel sollicitudin nisi. Donec finibus semper metus id malesuada.'
        },
        iconColor: {
          color: 'blue',
          circleColor: 'black',
          strokeColor: 'white'
        }
      },
      default_popup_vehicle: {
        id: 1,
        imei: '',
        marker: '',
        rotation: '',
        popup: true,
        tooltip: false,
        popup_data: {},
        tooltip_data: {},
        iconColor: {
          color: '',
          circleColor: 'black',
          strokeColor: 'white'
        }
      },
      map_locations: [],
      showMap: true,
      waypoints: [],
      show_waypoints: {},
      isOneTry: true
    }
  },
  mounted () {
    this.$store.commit('sidebar/setFromHistory', true)
  },
  computed: {
    getShowVehicle () {
      return this.$store.getters['vehicle/get_show_vehicles']
    },
    getWayPoints () {
      return this.$store.getters['vehicle/get_waypoints']
    },
    getHistoryDate () {
      return this.$store.getters['vehicle/get_history_date_range']
    }
  },
  watch: {
    getShowVehicle (newVal) {
      this.getVehicles(newVal)
    },
    getWayPoints (newVal) {
      this.waypoints = typeof newVal === 'object' ? [newVal] : newVal
    }
  },
  methods: {
    getDiffVehicle (l1, l2) {
      return l1.filter(item => !l2.find(i => i.imei === item.imei))
    },
    getVehicles (vehicles) {
      if (vehicles.length < 1) this.map_locations = []
      else {
        const diffItems = this.getDiffVehicle(this.map_locations, vehicles)
        diffItems.forEach(item => {
          this.map_locations = this.map_locations.filter(i => i !== item)
        })
      }
      for (const vehicle of vehicles) {
        if (vehicle.isPlay) {
          if (this.isOneTry) {
            this.playVehicleWayPointsShow(vehicle)
            this.isOneTry = false
          }
          this.defaultVehicleShow(vehicle)
        } else {
          this.defaultVehicleShow(vehicle)
          this.intervalClear(vehicle)
        }
      }
    },
    firstValueVehicle (vehicle) {
      vehicle.coordinates[0].insidePolygon = true
      this.default_popup_vehicle.marker = latLng(vehicle.lat, vehicle.lng)
      this.default_popup_vehicle.imei = vehicle.imei
      this.default_popup_vehicle.rotation = vehicle.coordinates[0].rotation
      this.default_popup_vehicle.popup_data = {
        title: vehicle.phoneNumber,
        imei: vehicle.imei,
        speed: vehicle.speed,
        ignition: vehicle.batteryPercent, // 0 ise kontak açık 1 ise kontak kapalı
        distance: vehicle.distance,
        insidePolygon: vehicle.coordinates[0].insidePolygon,
        type: this.getTypeText(vehicle)
      }
      this.default_popup_vehicle.iconColor = {
        color: vehicle.markerColors,
        circleColor: 'black',
        strokeColor: 'white',
        markerIcon: this.getIcons(vehicle),
        markerIconBlc: this.getIconsBlc(vehicle)
      }
      const data = Object.assign({}, this.default_popup_vehicle)
      return data
    },
    defaultVehicleShow (vehicle) {
      const _vehicle = this.map_locations.find(item => item.imei === vehicle.imei)
      if (!_vehicle) { this.map_locations.push(this.firstValueVehicle(vehicle)) } else {
        this.map_locations = this.map_locations.map(item => ({
          ...item,
          marker: item.imei === vehicle.imei ? latLng(vehicle.lat, vehicle.lng) : item.marker,
          rotation: item.imei === vehicle.imei ? vehicle.coordinates[0].rotation : item.rotation,
          popup_data: {
            ...item.popup_data,
            speed: item.imei === vehicle.imei ? vehicle.speed : item.popup_data.speed,
            distance: item.imei === vehicle.imei ? vehicle.distance : item.popup_data.distance,
            ignition: item.imei === vehicle.imei ? vehicle.coordinates[0].batteryPercent : item.popup_data.ignition,
            insidePolygon: item.imei === vehicle.imei ? vehicle.coordinates[0].insidePolygon : item.popup_data.insidePolygon,
            date: item.imei === vehicle.imei ? vehicle.lastData : item.popup_data.date
          }
        })
        )
      }
    },
    intervalClear (vehicle) {
      this.isOneTry = true
      this.$store.commit('vehicle/remove_way_points', vehicle.imei)
    },
    playVehicleWayPointsShow (vehicle) {
      const history = this.getHistoryDate

      useJwt.post(endpoints.getDeviceData, {
        Id: vehicle.id,
        EndDate: history.end,
        StartDate: history.start
      }).then((res) => {
        this.show_waypoints = { imei: vehicle.imei, color: '#3cd6e7', date: res?.data?.data?.lastData, coordinates: res?.data?.data?.coordinates }
      })
    },
    getIcons (vehicle) {
      const icons = this.$store.getters['vehicle/get_vehicleTypesIcon']
      return icons[vehicle.type]
    },
    getTypeText (vehicle) {
      const types = this.$store.getters['vehicle/get_vehicleTypes']
      return types[vehicle.type]
    },
    getIconsBlc (vehicle) {
      const icons = this.$store.getters['vehicle/get_vehicleTypesIconBlc']
      return icons[vehicle.type]
    },
    getIconsRed (vehicle) {
      const icons = this.$store.getters['vehicle/get_vehicleTypesIconRed']
      return icons[vehicle.type]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
