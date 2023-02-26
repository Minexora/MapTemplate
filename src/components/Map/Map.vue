<template>
   <div class="vh-100">
    <l-map
      v-if="showMap"
      ref="mapRef"
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
    >
      <l-tile-layer
        :url="url"
        :attribution="attribution"
      />
      <div v-for="(location, index) in locations" :key="index">
       <l-marker :marker="location.marker" :rotation="location.rotation" :popup="location.popup" :tooltip="location.tooltip" :popup_data="location.popup_data" :tooltip_data="location.tooltip_data" :iconColor="location.iconColor" >
        </l-marker>
      </div>
      <div v-for="(item, index) in waypoints" :key="index+ '_point'">
        <l-polyline :lat-lngs="item.points" :color="item.color" :weight=5 :fill="false" :fillColor="item.color" :fillOpacity="0.3" ></l-polyline>
       <!--  <l-routing-machine :waypoints="waypoints"/> -->
      </div >
      <l-control />
      <l-playback />
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LPolyline } from 'vue2-leaflet'
import MapMarker from '@/components/Map/MapMarker.vue'
import MapControl from '@/components/Map/MapControl.vue'
import Playback from '@/components/Map/Playback.vue'
import jwtDefaultConfig from '@/@core/auth/jwt/jwtDefaultConfig'
// import RoutingMachine from '@/components/Map/RoutingMachine.vue'

export default {
  name: 'MapComponent',
  components: {
    'l-map': LMap,
    'l-tile-layer': LTileLayer,
    'l-marker': MapMarker,
    // eslint-disable-next-line vue/no-unused-components
    'l-control': MapControl,
    // eslint-disable-next-line vue/no-unused-components
    'l-playback': Playback,
    // eslint-disable-next-line vue/no-unused-components
    // 'l-routing-machine': RoutingMachine

    'l-polyline': LPolyline
  },
  created () {
    this.$crontab.addJob({
      name: 'counter',
      interval: {
        seconds: '/5'
      },
      job: this.checkVehicleTimes
    })
  },
  mounted () {

  },
  props: {
    center: {
      type: Object,
      required: true
    },
    zoom: {
      type: Number,
      required: true
    },
    locations: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    },
    showMap: {
      type: Boolean,
      default: true
    },
    waypoints: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    }
  },
  computed: {

  },
  watch: {

  },
  data () {
    return {
      // url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      // attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
      currentZoom: 14,
      currentCenter: this.center,
      mapOptions: {
        zoomSnap: 0.5,
        attributionControl: false
      }
    }
  },
  methods: {
    zoomUpdate (zoom) {
      this.currentZoom = zoom
    },
    centerUpdate (center) {
      this.currentCenter = center
    },
    millisToMinutesAndSeconds (millis) {
      const minutes = Math.floor(millis / 60000)
      // const seconds = ((millis % 60000) / 1000).toFixed(0)
      // return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
      return minutes
    },
    getVehicleTime (type) {
      const times = localStorage.getItem(jwtDefaultConfig.vehicleTimes)
      const vehicleTimes = times && typeof times === 'string' ? JSON.parse(times) : {}
      const result = localStorage.getItem(jwtDefaultConfig.resultTimes)
      // eslint-disable-next-line prefer-const
      let timeData = result && typeof result === 'string' && result !== 'null' ? JSON.parse(result) : {}
      if (Object.keys(vehicleTimes).length > 0) {
        for (const time of Object.keys(vehicleTimes)) {
          let totalTime = 0
          if (!(time in timeData)) timeData[time] = {}
          const typeTimes = vehicleTimes[time][type]
          for (const time of typeTimes) {
            const endTime = time.end ? time.end : Date.now()
            totalTime += this.millisToMinutesAndSeconds(endTime - time.start)
          }
          timeData[time][type] = totalTime
        }
        localStorage.setItem(jwtDefaultConfig.resultTimes, JSON.stringify(timeData, null, 2))
      } else {
        localStorage.setItem(jwtDefaultConfig.resultTimes, null)
      }
    },
    checkVehicleTimes () {
      this.getVehicleTime('stop_times')
      this.getVehicleTime('idle_times')
      this.getVehicleTime('poligon_outside_times')
    }
  }
}
</script>

<style>

</style>
