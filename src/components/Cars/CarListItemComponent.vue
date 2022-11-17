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
          <img :id='vehicle.imei' :src='getIcons' class="img-fluid rounded-start col col-4 col-md-12">
          <b-tooltip :target="vehicle.imei">{{getStatus}}</b-tooltip>
        </div>
        <div class="col col-12 col-md-7 d-flex align-items-center justify-content-center">{{vehicle.phoneNumber}}</div>
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
      selected: false
    }
  },
  watch: {
    selected (newVal) {
      if (newVal) {
        this.$emit('selectedCar', this.vehicle)
      } else {
        this.$emit('unselectedCar', this.vehicle)
      }
    },
    allSelect (newVal) {
      this.selected = newVal
    }
  },
  computed: {
    getStatus () {
      const types = this.$store.getters['vehicle/get_vehicleTypes']
      return types[this.vehicle.type]
    },
    getIcons () {
      const icons = this.$store.getters['vehicle/get_vehicleTypesIcon']
      return icons[this.vehicle.type]
    }
  }
}
</script>

<style lang="scss">

</style>
