<template>
  <div class="vehicle_report">
    <div class="col col-12 dateField" v-if="getFromHistory">
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
      <div class="col col-12 col-md-12 car-list-filter-form" v-if="isFilter">
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
      </div>
      <div class="col col-12 col-md-12 car-list">
        <div v-if="this.cars.length >= 1">
          <car-list-item  v-for="car in cars" :key="car.imei" :vehicle="car" />
        </div>
        <not-found-data v-if="this.cars.length < 1"/>
      </div>
    </div>
  </div>
</template>

<script>
import CarListItemComponentForReport from '@/components/Cars/CarListItemComponentForReport.vue'
import NotFoundDataComponent from '@/components/NotFoundDataComponent.vue'
import DatePicker from 'vue2-datepicker'
import useJwt from '@/auth/jwt/useJwt'
import endpoints from '@/@core/auth/jwt/jwtDefaultConfig'
export default {
  name: 'CarListComponent',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    'car-list-item': CarListItemComponentForReport,
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
      isFilter: true,
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
    getFromHistory () {
      return this.$store.getters['sidebar/getFromHistory']
    },
    get_report_type () {
      return this.$store.getters['vehicle/get_report_type']
    }
  },
  watch: {
    selected_vehicle_type (newVal) {
      this.storedCars = this.$store.getters['vehicle/get_vehicle_list_for_report']
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
      this.storedCars = this.$store.getters['vehicle/get_vehicle_list_for_report']
      if (this.storedCars) {
        if (newVal !== '') {
          this.cars = this.storedCars.filter(item => item.phoneNumber.toLowerCase().includes(newVal) || item.imei.toLowerCase().includes(newVal))
        } else {
          this.cars = this.storedCars
        }
      }
    },
    date (newVal) {
      this.$store.commit('vehicle/set_history_date_range', { end: newVal[1], start: newVal[0] })
    },
    get_report_type (newVal) {
      this.getCarList(newVal)
      if (newVal === 'region') {
        this.isFilter = false
      } else {
        this.isFilter = true
      }
    }

  },
  methods: {
    logout () {
      localStorage.clear()
      this.$router.push({ name: 'login' }).catch(err => console.log(err))
    },
    getCarList (type) {
      let url = null
      if (type === 'vehicle') url = endpoints.getDevicesOnline2
      else if (type === 'region') url = endpoints.getRegionList
      useJwt.get(url).then((res) => {
        if (res.data.error === 'Exception') this.logout()
        if (type === 'region') {
          const tmpRegion = []
          for (const item of res.data.data) {
            tmpRegion.push({
              phoneNumber: item.name,
              imei: item.id
            })
          }
          this.cars = tmpRegion
        } else if (type === 'vehicle') {
          this.cars = res?.data?.data || []
        }
        this.$store.commit('vehicle/set_vehicle_list_for_report', this.cars)
      })
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
.dateField{
  display: flex;
  justify-content: center;
  padding: 15px 5px 5px 5px;
}
.vehicle_report{
  background-color: rgba(47, 64, 80, 0.9) !important;
  color: white
}
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
