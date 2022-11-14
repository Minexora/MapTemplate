<template>
  <div>
    <div class="col col-12 col-md-12">
      <b-form>
        <div class="row m-0 p-2">
          <div class="col col-12 col-md-6">
            <b-form-group
              id="input-group-1"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                v-model="filter_vehicle"
                type="text"
                placeholder="Plaka Giriniz"
              ></b-form-input>
            </b-form-group>
          </div>

          <div class="col col-12 col-md-6">
            <b-form-group
              id="input-group-2"
              label-for="input-2"
            >
              <b-form-select
              id="input-3"
              class="select_vehicle_type"
              placeholder="Araç Tipini Seçiniz"
              v-model="selected_vehicle_type"
              :options="select_vehicle_type_option"></b-form-select
              >
            </b-form-group>
          </div>
        </div>
       </b-form>
    </div>
    <div class="col col-12 col-md-12 car-list">
        <car-list-item v-for="car in cars" :key="car.imei" :vehicle="car" @selectedCar="select_car"  @unselectedCar="unselect_car" />
    </div>
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
      selected_cars: [],
      selected_vehicle_type: '',
      filter_vehicle: ''
    }
  },
  created () {
    this.getCarList()
    this.selected_vehicle_type = 1000
  },
  computed: {
    select_vehicle_type_option () {
      return this.$store.getters['vehicle/get_vehicleTypes']
    }
  },
  watch: {
    selected_vehicle_type (newVal) {
      const storedCars = this.$store.getters['vehicle/get_vehicle']
      if (parseInt(newVal) !== 1000) {
        this.cars = storedCars.filter(item => parseInt(item.type) === parseInt(newVal))
      } else {
        this.cars = storedCars
      }
      this.$store.commit('vehicle/set_showVehicles', [])
    },
    filter_vehicle (newVal) {
      const storedCars = this.$store.getters['vehicle/get_vehicle']
      if (newVal !== '') {
        this.cars = storedCars.filter(item => item.phoneNumber === newVal || item.imei === newVal)
      } else {
        this.cars = storedCars
      }
      this.$store.commit('vehicle/set_showVehicles', [])
    }
  },
  methods: {
    getCarList () {
      useJwt.get(endpoints.getDevicesOnline2).then((res) => {
        this.cars = res?.data?.data
        this.$store.commit('vehicle/set_vehicles', res.data.data)
      })
    },
    select_car (car) {
      this.selected_cars.push(car)
      this.$store.commit('vehicle/set_showVehicles', this.selected_cars)
    },
    unselect_car (car) {
      this.selected_cars = this.selected_cars.filter(item => item.imei !== car.imei)
      this.$store.commit('vehicle/remove_showVehicles', this.selected_cars)
    }
  }
}
</script>

<style>
.car-list {
  height: 85vh;
  overflow-y:scroll
}
.car-list::-webkit-scrollbar {
    display: none;
}
.select_vehicle_type{
  width: 100%;
  border-radius: 0.370rem;
  height: 40px;
  padding: 0.375rem 0.75rem;
}
</style>
