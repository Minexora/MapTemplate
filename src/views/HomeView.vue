<template>
  <div>
    <Map :center="map_center" :locations="map_locations" :waypoints="waypoints" :showMap="showMap" :zoom="map_zoom" />
    <b-sidebar />
  </div>
</template>

<script>
import Map from '@/components/Map/Map.vue'
import Sidebar from '@/components/Sidebar/SideComponent.vue'
import { latLng } from 'leaflet'
import useJwt from '@/auth/jwt/useJwt'
import endpoints from '@/@core/auth/jwt/jwtDefaultConfig'
export default {
  name: 'HomeView',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Map,
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
      intervals: {},
      waypoints: []
    }
  },
  computed: {
    getShowVehicle () {
      return this.$store.getters['vehicle/get_show_vehicles']
    },
    getWayPoints () {
      return this.$store.getters['vehicle/get_waypoints']
    }
  },
  watch: {
    getShowVehicle (newVal) {
      this.getVehicles(newVal)
    },
    getWayPoints (newVal) {
      this.waypoints = newVal
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
          this.playVehicleWayPointsShow(vehicle)
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
          popup_data: {
            ...item.popup_data,
            speed: item.imei === vehicle.imei ? vehicle.speed : item.popup_data.speed,
            distance: item.imei === vehicle.imei ? vehicle.distance : item.popup_data.distance,
            ignition: item.imei === vehicle.imei ? vehicle.batteryPercent : item.popup_data.ignition,
            insidePolygon: item.imei === vehicle.imei ? vehicle.coordinates[0].insidePolygon : item.popup_data.insidePolygon
          }
        })
        )
      }
    },
    intervalClear (vehicle) {
      clearInterval(this.intervals[vehicle.imei])
      delete this.intervals[vehicle.imei]
      this.$store.commit('vehicle/remove_way_points', vehicle.imei)
      this.$store.commit('vehicle/set_intervals', this.intervals)
    },
    playVehicleWayPointsShow (vehicle) {
      if (!(vehicle.imei in this.intervals)) {
        this.intervals[vehicle.imei] = setInterval(() => {
          useJwt.post(endpoints.GetDeviceDataForLastTenMinutes, { Id: vehicle.id }).then((res) => {
          // eslint-disable-next-line prefer-const
            let tmpwaypoints = this.$store.getters['vehicle/get_waypoints']
            // eslint-disable-next-line prefer-const
            let tmpvehicle = tmpwaypoints.find(item => item.imei === vehicle.imei)
            tmpwaypoints = tmpwaypoints.filter(item => item.imei !== vehicle.imei)
            if (!tmpvehicle) tmpvehicle = { imei: vehicle.imei, color: res?.data?.data?.markerColors, points: [] }
            res?.data?.data?.coordinates.forEach(item => {
              const tmppoint = [item.lat, item.lng]
              if (!tmpvehicle.points.find(item => item[0] === tmppoint[0] && item[1] === tmppoint[1])) {
                tmpvehicle.points.push(tmppoint)
              }
              const vehicleLastLocation = {
                location: {
                  lat: tmppoint[0],
                  lng: tmppoint[1]
                },
                rotation: item.rotation,
                speed: item.speed,
                distance: item.distance,
                imei: vehicle.imei,
                insidePolygon: item.insidePolygon
              }
              this.$store.commit('vehicle/set_last_location', vehicleLastLocation)
            })
            tmpwaypoints.push(tmpvehicle)
            this.$store.commit('vehicle/set_way_points', tmpwaypoints)
          })
        }, 3000)
        this.$store.commit('vehicle/set_intervals', this.intervals)
      }
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
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
