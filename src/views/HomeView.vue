<template>
  <div>
    <Map :center="map_center" :locations="map_locations" :showMap="showMap" :zoom="map_zoom" />
    <b-sidebar />
  </div>
</template>

<script>
import Map from '@/components/Map/Map.vue'
import Sidebar from '@/components/Sidebar/SideComponent.vue'
import { latLng } from 'leaflet'

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
      map_zoom: 11,
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
      map_locations: [],
      showMap: true
    }
  },
  computed: {
    getShowVehicle () {
      return this.$store.getters['vehicle/get_show_vehicles']
    }
  },
  watch: {
    getShowVehicle (newVal) {
      this.getVehicles(newVal)
    }
  },
  methods: {
    getVehicles (vehicles) {
      this.map_locations = []
      for (const vehicle of vehicles) {
        const data = {
          id: 1,
          marker: latLng(vehicle.lat, vehicle.lng),
          popup: true,
          tooltip: false,
          popup_data: {
            title: vehicle.phoneNumber,
            content: vehicle.imei

          },
          tooltip_data: {},
          iconColor: {
            color: vehicle.markerColors,
            circleColor: 'black',
            strokeColor: 'white'
          }
        }
        this.map_locations.push(data)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
