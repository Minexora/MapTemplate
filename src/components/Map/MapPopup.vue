<template>
    <l-popup v-if="data">
        <div class="row">
          <div class="col col-12 col-md-4">
            <strong>Araç :</strong>
          </div>
           <div class="col col-12 col-md-8">
           {{data.title}}
          </div>
        </div>
        <div class="row mt-2">
          <div class="col col-12 col-md-4">
            <strong>Imei :</strong>
          </div>
           <div class="col col-12 col-md-8">
           {{data.imei}}
          </div>
        </div>
        <div class="row mt-2">
          <div class="col col-12 col-md-4">
            <strong>Tip :</strong>
          </div>
           <div class="col col-12 col-md-8">
           {{data.type}}
          </div>
        </div>
        <div class="row mt-2">
          <div class="col col-12 col-md-4">
            <strong>Tarih :</strong>
          </div>
           <div class="col col-12 col-md-8">
           {{getDate}}
          </div>
        </div>
        <hr>
        <div class="row">
          <div class="col col-12 col-md-4 p-1 text-center">
            <div class="col col-12 col-md-12 mb-1">
              <img :id='data.imei + "_popup_speed"' :src='speed_icon' class="img-fluid rounded-start col col-1 col-md-8">
            </div>
            <div class="col col-12 col-md-12 mb-1">
              <strong>Hız</strong>
            </div>
            <div class="col col-12 col-md-12">
              {{Math.round(data.speed)}} KM
            </div>
          </div>
          <div class="col col-12 col-md-4 p-1 text-center">
            <div class="col col-12 col-md-12 mb-1">
              <img :id='data.imei + "_popup_distance"' :src='distance_icon' class="img-fluid rounded-start col col-1 col-md-8">
            </div>
            <div class="col col-12 col-md-12 mb-1">
             <strong>Takometre</strong>
            </div>
            <div class="col col-12 col-md-12">
              {{Math.round(data.distance)}} KM
            </div>
          </div>
          <div class="col col-12 col-md-4 p-1 text-center">
            <div class="col col-12 col-md-12 mb-1">
              <img :id='data.imei + "_popup_ignition"' :src='ignition_icon' class="img-fluid rounded-start col col-1 col-md-8">
            </div>
            <div class="col col-12 col-md-12 mb-1">
              <strong>Kontak</strong>
            </div>
             <div class="col col-12 col-md-12">
              {{data.ignition ? "Kapalı" : "Açık"}}
            </div>
          </div>
          <hr>
          <div class="col col-12 col-md-4 p-1 text-center">
            <div class="col col-12 col-md-12 mb-1">
              <img :id='data.imei + "_popup_idle"' :src='idle_icon' class="img-fluid rounded-start col col-1 col-md-8">
            </div>
            <div class="col col-12 col-md-12 mb-1">
              <strong>Araç Rölanti Süresi(DK)</strong>
            </div>
             <div class="col col-12 col-md-12">
              {{times.idle_time}}
            </div>
          </div>
          <div class="col col-12 col-md-4 p-1 text-center">
            <div class="col col-12 col-md-12 mb-1">
              <img :id='data.imei + "_popup_stop"' :src='stop_icon' class="img-fluid rounded-start col col-1 col-md-8">
            </div>
            <div class="col col-12 col-md-12 mb-1">
              <strong>Araç Durma Süresi(DK)</strong>
            </div>
             <div class="col col-12 col-md-12">
              {{times.stop_time}}
            </div>
          </div>
          <div class="col col-12 col-md-4 p-1 text-center">
            <div class="col col-12 col-md-12 mb-1">
              <img :id='data.imei + "_popup_stop"' :src='poligon_icon' class="img-fluid rounded-start col col-1 col-md-8">
            </div>
            <div class="col col-12 col-md-12 mb-1">
              <strong>Bölge Dışındaki Süre(DK)</strong>
            </div>
            <div class="col col-12 col-md-12">
              {{times.poligon_time}}
            </div>
          </div>
          <hr>
          <div class="col col-12 col-md-12 p-1 text-center">
            <b-button pill variant="success" size="sm" @click="modal = true">Sefer Listesi</b-button>
            <b-modals :isShow.sync="modal"  :size="'xl'" :type="'expedition'" :title="'Sefer Listesi'" />
          </div>
        </div>
    </l-popup>
</template>

<script>
import { LPopup } from 'vue2-leaflet'
import jwtDefaultConfig from '@/@core/auth/jwt/jwtDefaultConfig'
import ModalComponent from '@/components/ModalComponent.vue'
export default {
  name: 'MapPopup',
  components: {
    'l-popup': LPopup,
    'b-modals': ModalComponent
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    times: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    getDate () {
      return this.data?.date?.replace('T', ' ')
    }
  },
  watch: {
    data (newVal, oldVal) {
      if (typeof newVal.insidePolygon !== 'undefined') {
        this.poligon_outside_time(newVal.imei, !newVal.insidePolygon)
      }
      // if (newVal.ignition !== oldVal.ignition) {
      if (!newVal.ignition) {
        if (newVal.speed < 1) {
          this.idle_time(newVal.imei, true)
        } else {
          this.idle_time(newVal.imei, false)
        }
        this.stop_time(newVal.imei, false)
      } else {
        this.stop_time(newVal.imei, true)
        this.idle_time(newVal.imei, false)
      }
      // }
    }
  },
  data () {
    return {
      crons: [],
      modal: false,
      speed_icon: require('@/assets/images/speedometer.png'),
      distance_icon: require('@/assets/images/distance.png'),
      ignition_icon: require('@/assets/images/ignition.png'),
      idle_icon: require('@/assets/images/rolanti.png'),
      stop_icon: require('@/assets/images/park.png'),
      poligon_icon: require('@/assets/images/outside.png'),
      vehicleTimesInit: { poligon_outside_times: [], idle_times: [], stop_times: [] }
    }
  },
  methods: {
    poligon_outside_time (imei, outside) {
      // eslint-disable-next-line prefer-const
      let vehicleTimes = JSON.parse(localStorage.getItem(jwtDefaultConfig.vehicleTimes)) || {}
      if (outside) {
        if (!vehicleTimes[imei]) vehicleTimes[imei] = this.vehicleTimesInit
        const unclosed = vehicleTimes[imei].poligon_outside_times.find(item => item.start !== '' && item.end === '')
        if (!unclosed) {
          vehicleTimes[imei].poligon_outside_times.push({ start: Date.now(), end: '' })
        }
        localStorage.setItem(jwtDefaultConfig.vehicleTimes, JSON.stringify(vehicleTimes, null, 2))
      } else {
        let poligonTimes = vehicleTimes[imei]?.poligon_outside_times || []
        const timeData = poligonTimes.find(item => item.end === '')
        if (timeData) {
          poligonTimes = poligonTimes.filter(item => item !== timeData)
          timeData.end = Date.now()
          poligonTimes.push(timeData)
          vehicleTimes[imei].poligon_outside_times = poligonTimes
          localStorage.setItem(jwtDefaultConfig.vehicleTimes, JSON.stringify(vehicleTimes, null, 2))
        }
      }
    },
    idle_time (imei, idle) {
      // eslint-disable-next-line prefer-const
      let vehicleTimes = JSON.parse(localStorage.getItem(jwtDefaultConfig.vehicleTimes)) || {}
      if (idle) {
        if (!vehicleTimes[imei]) vehicleTimes[imei] = this.vehicleTimesInit
        const unclosed = vehicleTimes[imei].idle_times.find(item => item.start !== '' && item.end === '')
        if (!unclosed) {
          vehicleTimes[imei].idle_times.push({ start: Date.now(), end: '' })
        }
        localStorage.setItem(jwtDefaultConfig.vehicleTimes, JSON.stringify(vehicleTimes, null, 2))
      } else {
        let idleTimes = vehicleTimes[imei]?.idle_times || []
        const timeData = idleTimes.find(item => item.end === '')
        if (timeData) {
          idleTimes = idleTimes.filter(item => item !== timeData)
          timeData.end = Date.now()
          idleTimes.push(timeData)
          vehicleTimes[imei].idle_times = idleTimes
          localStorage.setItem(jwtDefaultConfig.vehicleTimes, JSON.stringify(vehicleTimes, null, 2))
        }
      }
    },
    stop_time (imei, stop) {
      // eslint-disable-next-line prefer-const
      let vehicleTimes = JSON.parse(localStorage.getItem(jwtDefaultConfig.vehicleTimes)) || {}
      if (stop) {
        if (!vehicleTimes[imei]) vehicleTimes[imei] = this.vehicleTimesInit
        const unclosed = vehicleTimes[imei].stop_times.find(item => item.start !== '' && item.end === '')
        if (!unclosed) {
          vehicleTimes[imei].stop_times.push({ start: Date.now(), end: '' })
        }
        localStorage.setItem(jwtDefaultConfig.vehicleTimes, JSON.stringify(vehicleTimes, null, 2))
      } else {
        let stopTimes = vehicleTimes[imei]?.stop_times || []
        const timeData = stopTimes.find(item => item.end === '')
        if (timeData) {
          stopTimes = stopTimes.filter(item => item !== timeData)
          timeData.end = Date.now()
          stopTimes.push(timeData)
          vehicleTimes[imei].stop_times = stopTimes
          localStorage.setItem(jwtDefaultConfig.vehicleTimes, JSON.stringify(vehicleTimes, null, 2))
        }
      }
    }

  }
}
</script>

<style>
.leaflet-popup  {
  width: 250px;
}
</style>
