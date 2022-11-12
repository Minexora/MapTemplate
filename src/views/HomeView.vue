<template>
  <div>
    <Map :center="map_center" :locations="map_locations" :showMap="showMap" :zoom="map_zoom" />
  </div>
</template>

<script>
import Map from '@/components/Map/Map.vue'
import { latLng } from 'leaflet'

export default {
  name: 'HomeView',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Map
  },
  data () {
    return {
      map_center: latLng(39.913652, 32.854246),
      map_zoom: 5,
      map_locations: [
        {
          id: 1,
          marker: latLng(47.41322, -1.219482),
          popup: true,
          tooltip: false,
          popup_data: {
            title: 'I am a popup',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sed pretium nisl, ut sagittis sapien. Sed vel sollicitudin nisi. Donec finibus semper metus id malesuada.'
          },
          tooltip_data: {},
          iconColor: {
            color: 'red',
            circleColor: 'black',
            strokeColor: 'white'
          }

        },
        {
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
        }
      ],
      showMap: true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
