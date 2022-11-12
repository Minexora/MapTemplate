<template>
   <div class="vh-100">
    <l-map
      v-if="showMap"
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
      <div v-for="location in locations" :key="location.id">
        <l-marker :marker="location.marker" :popup="location.popup" :tooltip="location.tooltip" :popup_data="location.popup_data" :tooltip_data="location.tooltip_data" :iconColor="location.iconColor" />
      </div>
      <l-control />
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer } from 'vue2-leaflet'
import MapMarker from '@/components/Map/MapMarker.vue'
import MapControl from '@/components/Map/MapControl.vue'

export default {
  name: 'MapComponent',
  components: {
    'l-map': LMap,
    'l-tile-layer': LTileLayer,
    'l-marker': MapMarker,
    // eslint-disable-next-line vue/no-unused-components
    'l-control': MapControl
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
    }
  },
  data () {
    return {
      // url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      // attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
      currentZoom: 11.5,
      currentCenter: this.center,
      mapOptions: {
        zoomSnap: 0.5
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
