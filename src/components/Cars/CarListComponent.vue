<template>
  <div>
    <div class="col col-12" v-if="getFromHistory">
      <date-picker
        v-model="date"
        type="datetime"
        :format="dateTimeOptions.format"
        :title-format="dateTimeOptions.format"
        placeholder="Tarih Aralığı Seçiniz."
        :range="dateTimeOptions.range"
        :show-time-panel="dateTimeOptions.showTimeRangePanel"
        @close="handleRangeClose"
        :clearable="dateTimeOptions.clearable"
        :value-type="dateTimeOptions.value_type"
      >
        <template v-slot:footer>
          <button
            class="mx-btn mx-btn-text"
            @click="toggleTimeRangePanel"
          >
            {{ dateTimeOptions.showTimeRangePanel ? 'select date' : 'select time' }}
          </button>
        </template>
      </date-picker>
    </div>
    <div class="car-list-component">
      <div class="col col-12 col-md-12 car-list-filter-form">
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
                    placeholder="Plaka / Imei Giriniz"
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
        <div class="col col-12 col-md-12  all_select_car my-2">
          <input class="form-check-input" v-model="all_selected" type="checkbox" value="" id="allSelectCars">
          <label class="form-check-label mx-2" for="allSelectCars">Tüm Araçları Göster</label>
        </div>
      </div>
      <div class="col col-12 col-md-12 car-list">
        <div v-if="this.cars.length >= 1">
          <car-list-item  v-for="car in cars" :key="car.imei" :vehicle="car"  :allSelect="all_selected" @selectedCar="select_car"  @unselectedCar="unselect_car" />
        </div>
        <not-found-data v-if="this.cars.length < 1"/>
      </div>
    </div>
  </div>
</template>

<script>
import CarListItemComponent from '@/components/Cars/CarListItemComponent.vue'
import NotFoundDataComponent from '@/components/NotFoundDataComponent.vue'
import DatePicker from 'vue2-datepicker'
import useJwt from '@/auth/jwt/useJwt'
import endpoints from '@/@core/auth/jwt/jwtDefaultConfig'
export default {
  name: 'CarListComponent',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    'car-list-item': CarListItemComponent,
    // eslint-disable-next-line vue/no-unused-components
    'not-found-data': NotFoundDataComponent,
    DatePicker
  },
  data () {
    return {
      cars: [],
      selected_cars: [],
      storedCars: [],
      selected_vehicle_type: '',
      filter_vehicle: '',
      all_selected: false,
      intervals: {},
      date: [],
      dateTimeOptions: {
        showTimePanel: false,
        showTimeRangePanel: false,
        range: true,
        format: 'YYYY-MM-DD HH:mm:ss',
        clearable: true,
        value_type: 'format'
      }
    }
  },
  created () {
    this.getCarList()
  },
  mounted () {
    this.selected_vehicle_type = 1000
  },
  computed: {
    select_vehicle_type_option () {
      return this.$store.getters['vehicle/get_vehicleTypes']
    },
    get_intervals () {
      return this.$store.getters['vehicle/get_intervals']
    },
    getFromHistory () {
      return this.$store.getters['sidebar/getFromHistory']
    }
  },
  watch: {
    selected_vehicle_type (newVal) {
      this.storedCars = this.$store.getters['vehicle/get_vehicle']
      if (this.storedCars) {
        if (parseInt(newVal) !== 1000) {
          this.cars = this.storedCars.filter(item => parseInt(item.type) === parseInt(newVal))
        } else {
          this.cars = this.storedCars
        }
      }
      // this.$store.commit('vehicle/set_showVehicles', [])
    },
    filter_vehicle (newVal) {
      this.storedCars = this.$store.getters['vehicle/get_vehicle']
      if (this.storedCars) {
        if (newVal !== '') {
          this.cars = this.storedCars.filter(item => item.phoneNumber.toLowerCase().includes(newVal) || item.imei.toLowerCase().includes(newVal))
        } else {
          this.cars = this.storedCars
        }
      }
      this.$store.commit('vehicle/set_showVehicles', [])
    },
    get_intervals (newVal) {
      this.intervals = newVal
    },
    date (newVal) {
      this.$store.commit('vehicle/set_history_date_range', { end: newVal[1], start: newVal[0] })
    }
  },
  methods: {
    logout () {
      localStorage.clear()
      this.$router.push({ name: 'login' }).catch(err => console.log(err))
    },
    getCarList () {
      useJwt.get(endpoints.getDevicesOnline2).then((res) => {
        if (res.data.error === 'Exception') this.logout()
        this.cars = res?.data?.data || []
        this.cars.map(item => ({ ...item, isPlay: 0 }))
        this.$store.commit('vehicle/set_vehicles', this.cars)
      })
    },
    select_car (car) {
      if (this.selected_cars.find(item => item.imei === car.imei)) { this.selected_cars = this.selected_cars.filter(item => item.imei !== car.imei) }
      this.selected_cars.push(car)
      this.$store.commit('vehicle/set_showVehicles', this.selected_cars)
    },
    unselect_car (car) {
      this.selected_cars = this.selected_cars.filter(item => item.imei !== car.imei)
      this.$store.commit('vehicle/set_showVehicles', this.selected_cars.length < 1 ? [] : this.selected_cars)
      this.intervalClear(car)
      this.removeVehicleTime(car.imei)
    },
    intervalClear (vehicle) {
      clearInterval(this.intervals[vehicle.imei])
      delete this.intervals[vehicle.imei]
      this.$store.commit('vehicle/remove_way_points', vehicle.imei)
      this.$store.commit('vehicle/set_intervals', this.intervals)
    },
    removeVehicleTime (imei) {
      // eslint-disable-next-line prefer-const
      let vehicleTimes = JSON.parse(localStorage.getItem(endpoints.vehicleTimes)) || {}
      // eslint-disable-next-line prefer-const
      let result = JSON.parse(localStorage.getItem(endpoints.resultTimes)) || {}
      delete vehicleTimes[imei]
      delete result[imei]
      localStorage.setItem(endpoints.vehicleTimes, JSON.stringify(vehicleTimes, null, 2))
      localStorage.setItem(endpoints.resultTimes, JSON.stringify(result, null, 2))
    },
    toggleTimeRangePanel () {
      this.dateTimeOptions.showTimeRangePanel =
        !this.dateTimeOptions.showTimeRangePanel
    },
    handleRangeClose () {
      this.showTimeRangePanel = false
    }
  }
}
</script>

<style lang="scss">
.car-list-filter-form {
  border-top: 0px;
  border-bottom: 3px;
  border-left: 0px;
  border-right: 0px;
  border-color: white;
  border-style: solid;
  padding: 5px;
}
.car-list {
  height: 75vh;
  overflow-y:scroll;
}
.car-list::-webkit-scrollbar {
  display: none;
}
.all_select_car {
  text-align: left !important;
  padding-left: 5px;
  margin: 0;
}
.select_vehicle_type{
  width: 100%;
  border-radius: 0.370rem;
  height: 40px;
  padding: 0.375rem 0.75rem;
}

</style>
