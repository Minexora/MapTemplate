<template>
  <div>
    <slot v-if="ready"></slot>
  </div>
</template>

<script>
import L from 'leaflet'
import 'leaflet-plugin-trackplayback/src/control.trackplayback'
import 'leaflet-plugin-trackplayback/src/leaflet.trackplayback'
import { findRealParent } from 'vue2-leaflet'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Playback',
  components: {
  },
  props: {

  },
  mounted () {
    this.parentContainer = findRealParent(this.$parent)
    this.add()
    this.ready = true
  },
  beforeDestroy () {
    return this.layer ? this.layer.remove() : null
  },
  data () {
    return {
      parentContainer: null,
      ready: false,
      layer: null,
      track: [
        [{ lat: 18.434918333333332, lng: -68.86176999999999, time: 1502529980, dir: -68.86176999999999, info: [] }],
        [{ lat: 18.434918333333332, lng: -68.86176999999999, time: 1502539980, dir: -68.86176999999999, info: [] }],
        [{ lat: 18.434918333333332, lng: -68.86176999999999, time: 1502549980, dir: -68.86176999999999, info: [] }],
        [{ lat: 18.434918333333332, lng: -68.86176999999999, time: 1502559980, dir: -68.86176999999999, info: [] }],
        [{ lat: 18.434918333333332, lng: -68.86176999999999, time: 1502569980, dir: -68.86176999999999, info: [] }],
        [{ lat: 18.434918333333332, lng: -68.86176999999999, time: 1502579980, dir: -68.86176999999999, info: [] }],
        [{ lat: 18.434918333333332, lng: -68.86176999999999, time: 1502589980, dir: -68.86176999999999, info: [] }],
        [{ lat: 18.434918333333332, lng: -68.86176999999999, time: 1502599980, dir: -68.86176999999999, info: [] }]
      ],
      options: {
        trackPointOptions: {
          isDraw: false,
          useCanvas: true,
          stroke: false,
          color: '#ef0300',
          fill: true,
          fillColor: '#ef0300',
          opacity: 0.3,
          radius: 4
        },
        trackLineOptions: {
          isDraw: false,
          stroke: true,
          color: '#1C54E2',
          weight: 2,
          fill: false,
          fillColor: '#000',
          opacity: 0.3
        },
        targetOptions: {
          useImg: false,
          imgUrl: require('@/assets/images/car_1.png'),
          width: 8,
          height: 18,
          color: '#00f',
          fillColor: '#9FD12D'
        },
        toolTipOptions: {
          offset: [0, 0],
          direction: 'top',
          permanent: false
        }
      }
    }
  },
  methods: {
    getTime () {
      return new Date().getTime() / 1000
    },

    add () {
      if (this.parentContainer._isMounted) {
        const { mapObject } = this.parentContainer
        const trackplayback = L.trackplayback(this.track, mapObject, this.options)
        const trackplaybackControl = L.trackplaybackcontrol(trackplayback)
        trackplaybackControl.addTo(mapObject)
        this.layer = trackplaybackControl
      }
    }
  }
}
</script>

<style>
</style>
