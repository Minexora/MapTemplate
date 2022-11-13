<template>
  <div class="d-flex">
      <div class="col col-12 col-md-2"></div>
      <div class="col col-12 col-md-6">{{vehicle.phoneNumber}}</div>
      <div class="col col-12 col-md-2">{{getStatus}}</div>
  </div>
</template>

<script>
export default {
  name: 'CarListItemComponent',
  props: {
    vehicle: {
      type: Object,
      required: true
    }
  },
  data () {
    return {

    }
  },
  computed: {
    getStatus () {
      const types = this.$store.getters['vehicle/get_vehicleTypes']
      return types[this.vehicle.type]
    }
  }
}
</script>

<style>

</style>
