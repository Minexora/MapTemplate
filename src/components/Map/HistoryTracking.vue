<template>
  <div>
    <div class="player_container" id="historyTracking"></div>
  </div>
</template>

<script>
import { Player } from '@/assets/js/player.js'
export default {
  name: 'HistoryTracking',
  props: {
    historyTracking: {
      required: true,
      type: Object
    }
  },
  data () {
    return {
      container: null
    }
  },
  watch: {
    historyTracking () {
      this.timeline_create()
    }
  },
  mounted () {
    this.container = document.querySelector('.player_container')
    this.container.style.visibility = 'hidden'
    // this.timeline_create()
  },
  methods: {
    getMaxSpeed () {
      const speeds = this.historyTracking.coordinates.map((item) => Math.round(item.speed))
      return Math.max.apply(null, speeds)
    },
    timeline_create () {
      if ('imei' in this.historyTracking) {
        this.container.style.visibility = 'visible'
        this.container.innerHTML = ''
        const player = new Player({
          max: this.getMaxSpeed(),
          timeLineHeight: 40,
          playbackSpeed: 1000,
          showFunc: this.showVehicleOnMap,
          funcSelf: {
            waipoint: { imei: this.historyTracking.imei, color: this.historyTracking.color, points: [] },
            marker: {
              location: {
                lat: 0,
                lng: 0
              },
              rotation: 0,
              speed: 0,
              distance: 0,
              imei: this.historyTracking.imei,
              insidePolygon: true,
              ignition: 0,
              date: this.historyTracking.date
            }
          }
        })
        for (const [index, value] of this.historyTracking.coordinates.entries()) {
          player.createTimeItem({ id: index, obj: value, current: value.speed, onClick: this.timeLineItemClick })
        }
      }
    },
    timeLineItemClick (val) {
      // console.log('timeLineItemClick', val)
    },
    showVehicleOnMap (self, obj) {
      const waipoint = self.waipoint
      const marker = self.marker
      obj.forEach(element => {
        waipoint.points.push([element.lat, element.lng])
        marker.location.lat = element.lat
        marker.location.lng = element.lng
        marker.rotation = element.rotation
        marker.speed = element.speed
        marker.distance = element.distance
        marker.insidePolygon = element.insidePolygon
        marker.ignition = element.batteryPercent
      })
      this.$store.commit('vehicle/set_way_points', waipoint)
      this.$store.commit('vehicle/set_last_location', marker)
    }
  }
}
</script>

<style>

</style>
