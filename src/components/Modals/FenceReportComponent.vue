<template>
  <div>
    <b-row>
      <b-col class="col col-12 col-md-4 col-lg-4 col-xl-3">
        <car-list-component-for-report />
      </b-col>

      <b-col class="col col-12 col-md-8 col-lg-8 col-xl-9">
        <main-table-component :fields="headers" :items="items" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import MainTableComponent from '@/components/Tables/MainTableComponent.vue'
import CarListComponentForReport from '@/components/Cars/CarListComponentForReport.vue'
import endpoints from '@/@core/auth/jwt/jwtDefaultConfig'
import DatePicker from 'vue2-datepicker'
import useJwt from '@/auth/jwt/useJwt'
import 'vue2-datepicker/locale/tr'
import moment from 'moment'

export default {
  name: 'VehicleFenceReportComponent',
  components: {
    /* eslint-disable vue/no-unused-components */
    DatePicker,
    MainTableComponent,
    CarListComponentForReport
  },
  data () {
    return {
      headers: [
        {
          key: 'wehName',
          label: 'Araç Adı',
          sortable: true,
          sortDirection: 'desc'
        },
        {
          key: 'plate',
          label: 'Plaka',
          sortable: true,
          class: 'text-center'
        },
        {
          key: 'entryDate',
          label: 'Giriş Zamanı',
          sortable: true,
          class: 'text-center',
          formatter: (value, key, item) => {
            if ('entryDate' in item) { return moment(String(item.entryDate)).format('DD/MM/YYYY HH:mm') }
            return 'BOŞ'
          }
        },
        {
          key: 'exitDate',
          label: 'Çıkış Zamanı',
          sortable: true,
          class: 'text-center',
          formatter: (value, key, item) => {
            if ('exitDate' in item) { return moment(String(item.exitDate)).format('DD/MM/YYYY HH:mm') }
            return 'BOŞ'
          }
        },
        {
          key: 'minutes',
          label: 'Bölgede Geçen Süre (Dk.)',
          sortable: true,
          class: 'text-center',
          formatter: (value, key, item) => {
            if ('minutes' in item) { return (item.minutes).toString() + ' ' + 'DK' }
            return 'BOŞ'
          }
        },
        {
          key: 'distance',
          label: 'Giriş KM',
          sortable: true,
          class: 'text-center',
          formatter: (value, key, item) => {
            if ('distance' in item) { return Math.round(item.distance) + ' ' + 'KM' }
            return 'BOŞ'
          }
        }
      ],
      items: []
    }
  },
  computed: {
    get_vehicle_selected_for_report () {
      return this.$store.getters['vehicle/get_vehicle_selected_for_report']
    },
    get_history_date_range () {
      return this.$store.getters['vehicle/get_history_date_range']
    }
  },
  watch: {
    get_history_date_range () {
      this.getVehicleFenceReportData()
    },
    get_vehicle_selected_for_report (newVal) {
      if (newVal != null) this.getVehicleFenceReportData()
    }
  },
  mounted () {
    this.$store.commit('sidebar/setFromHistory', true)
    this.$store.commit('vehicle/set_report_type', 'region')
  },
  methods: {
    getVehicleFenceReportData () {
      const date = this.get_history_date_range
      useJwt
        .post(endpoints.getRegionDevicesData, {
          endDate: date.end,
          startDate: date.start,
          id: this.get_vehicle_selected_for_report
        })
        .then((res) => {
          this.items = res.data.data
          this.$store.commit('vehicle/set_vehicle_selected_for_report', null)
        })
    }
  }
}
</script>

<style></style>
