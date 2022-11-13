<template>
    <div class="col col-12">
        <car-list-item v-for="car in cars" :key="car.imei" :vehicle="car" @selectedCar="select_car"/>
    </div>
</template>

<script>
import CarListItemComponent from '@/components/Cars/CarListItemComponent.vue'
import useJwt from '@/auth/jwt/useJwt'
import endpoints from '@/@core/auth/jwt/jwtDefaultConfig'
export default {
  name: 'CarListComponent',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    'car-list-item': CarListItemComponent
  },
  data () {
    return {
      cars: [],
      selected_cars: []
    }
  },
  created () {
    this.getCarList()
  },
  methods: {
    getCarList () {
      useJwt.get(endpoints.getDevicesOnline2).then((res) => {
        this.cars = res?.data?.data
        this.$store.commit('vehicle/set_showVehicles', res.data.data)
        useJwt.setVehicles(JSON.stringify(res.data.data))
      })
    },
    select_car (car) {
      this.selected_cars.push(car)
    },
    unselect_car (car) {

    }
  }
}
</script>

<style>

</style>
