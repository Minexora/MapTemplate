<template>
  <div class="row border-bottom border-top p-1 m-0">
    <div class="col col-1 col-md-1 border-right d-flex align-items-center justify-content-center">
        <div class="form-check">
          <input class="form-check-input" v-model="selected" type="checkbox" value="" id="flexCheckIndeterminate">
        </div>
    </div>
    <div class="col col-11 col-md-11 m-0 border-left">
      <div class="row">
        <div class="col col-12 col-md-2 d-flex align-items-center justify-content-center">
          <img :id='tmpVehicle.imei' :src='getIcons' class="img-fluid rounded-start col col-4 col-md-12">
          <b-tooltip :target="tmpVehicle.imei">{{getStatus}}</b-tooltip>
        </div>
        <div class="col col-12 col-md-7 d-flex align-items-center justify-content-center">{{tmpVehicle.phoneNumber}}</div>
        <div v-if="selected" class="col col-12 col-md-2 d-flex align-items-center justify-content-center" @click="playBtnFunction">
          <img :id='tmpVehicle.imei + "_play"' :src='play_icon' class="img-fluid rounded-start col col-1 col-md-8">
          <!-- <b-tooltip :target="tmpVehicle.imei + '_play'">{{play_desc}}</b-tooltip> -->
        </div>
        <!-- <div class="col col-12 col-md-2 d-flex align-items-center justify-content-center">{{getStatus}}</div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CarListItemComponent',
  props: {
    vehicle: {
      type: Object,
      required: true
    },
    allSelect: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      selected: false,
      tmpVehicle: this.vehicle,
      start_icon: require('@/assets/images/play-button.png'),
      stop_icon: require('@/assets/images/stop-button.png'),
      play_icon: require('@/assets/images/play-button.png'),
      play_desc: 'Play'
    }
  },
  watch: {
    selected (newVal) {
      if (newVal) {
        this.$emit('selectedCar', this.tmpVehicle)
      } else {
        this.tmpVehicle.isPlay = false
        this.setIcon()
        this.$emit('unselectedCar', this.tmpVehicle)
      }
    },
    allSelect (newVal) {
      this.selected = newVal
    }
  },
  computed: {
    getStatus () {
      const types = this.$store.getters['vehicle/get_vehicleTypes']
      return types[this.tmpVehicle.type]
    },
    getIcons () {
      const icons = this.$store.getters['vehicle/get_vehicleTypesIcon']
      return icons[this.tmpVehicle.type]
    },
    getIconsBlc () {
      const icons = this.$store.getters['vehicle/get_vehicleTypesIconBlc']
      return icons[this.tmpVehicle.type]
    },
    getIconsRed () {
      const icons = this.$store.getters['vehicle/get_vehicleTypesIconRed']
      return icons[this.tmpVehicle.type]
    }
  },
  methods: {
    playBtnFunction () {
      this.tmpVehicle.isPlay = !this.tmpVehicle.isPlay
      this.$emit('selectedCar', this.tmpVehicle)
      this.setIcon()
    },
    setIcon () {
      if (this.tmpVehicle.isPlay) {
        this.play_icon = this.stop_icon
        this.play_desc = 'Stop'
      } else {
        this.play_icon = this.start_icon
        this.play_desc = 'Play'
      }
    }
  }
}
</script>

<style lang="scss">
</style>
