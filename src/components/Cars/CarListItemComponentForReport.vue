<template>
  <div class="row border-bottom border-top p-1 m-0">
    <div class="col col-11 col-md-11 m-0 border-left">
      <div class="row">
        <div class="col col-12 col-md-2 d-flex align-items-center justify-content-center" v-if="showIcon">
          <img :id='tmpVehicle.imei' :src='getIcons' class="img-fluid rounded-start col col-4 col-md-6">
          <b-tooltip :target="tmpVehicle.imei">{{getStatus}}</b-tooltip>
        </div>
        <div class="col col-12 col-md-7 d-flex align-items-center justify-content-center">{{tmpVehicle.phoneNumber}}</div>
        <div class="col col-12 col-md-2 d-flex align-items-center justify-content-center" @click="playBtnFunction">
          <img :id='tmpVehicle.imei + "_play"' :src='play_icon' class="img-fluid rounded-start col col-1 col-md-5">
        </div>
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
    showIcon: {
      type: Boolean,
      default: true
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
      this.$store.commit('vehicle/set_vehicle_selected_for_report', this.tmpVehicle.id)
    }
  }
}
</script>

<style lang="scss">
</style>
