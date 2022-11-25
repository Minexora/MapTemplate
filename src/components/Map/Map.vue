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
       <l-marker :marker="location.marker" :popup="location.popup" :tooltip="location.tooltip" :popup_data="location.popup_data" :tooltip_data="location.tooltip_data" :iconColor="location.iconColor" >
        </l-marker>
      </div>
      <div v-for="(item, index) in waypoints" :key="index+ '_point'">
        <l-polyline :lat-lngs="item.points" :color="item.color" :weight=5 :fill="false" :fillColor="item.color" :fillOpacity="0.3" ></l-polyline>
       <!--  <l-routing-machine :waypoints="waypoints"/> -->
      </div >
      <l-control />
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LPolyline } from 'vue2-leaflet'
import MapMarker from '@/components/Map/MapMarker.vue'
import MapControl from '@/components/Map/MapControl.vue'
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
    // 'l-routing-machine': RoutingMachine

    'l-polyline': LPolyline
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
    }
  }
}
</script>

<style>

</style>
