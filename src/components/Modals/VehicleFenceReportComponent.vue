<template>
  <div>
    <b-card
      border-variant="warning"
      header=""
      header-bg-variant="transparent"
      align="center"
    >
      <b-card-text>

        <label
          class="pe-3"
          for="date_picker"
        >Tarih Aralığı: </label>

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

      </b-card-text>
    </b-card>
    <main-table-component
      :fields="headers"
      :items="items"
    />
  </div>
</template>

<script>
import MainTableComponent from '@/components/Tables/MainTableComponent.vue'
import endpoints from '@/@core/auth/jwt/jwtDefaultConfig'
import DatePicker from 'vue2-datepicker'
import useJwt from '@/auth/jwt/useJwt'
import 'vue2-datepicker/locale/tr'

export default {
  name: 'VehicleFenceReportComponent',
  components: {
    MainTableComponent,
    DatePicker
  },
  data () {
    return {
      date: [],
      dateTimeOptions: {
        showTimePanel: false,
        showTimeRangePanel: false,
        range: true,
        format: 'YYYY-MM-DD HH:mm:ss',
        clearable: true,
        value_type: 'format'
      },
      headers: [
        {
          key: 'id',
          label: 'Cihaz Id',
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
          key: 'phoneNumber',
          label: 'Araç Adı',
          sortable: true,
          class: 'text-center'
        },
        {
          key: 'distStart',
          label: 'İlk Distance',
          sortable: true,
          class: 'text-center',
          formatter: (value, key, item) => {
            if ('distStart' in item) { return (item.distStart).toString() + ' ' + 'km' }
            return 'BOŞ'
          }
        },
        {
          key: 'distEnd',
          label: 'Son Distance',
          sortable: true,
          class: 'text-center',
          formatter: (value, key, item) => {
            if ('distEnd' in item) { return (item.distEnd).toString() + ' ' + 'km' }
            return 'BOŞ'
          }
        },
        {
          key: 'distDif',
          label: 'Toplam Distance',
          sortable: true,
          class: 'text-center',
          formatter: (value, key, item) => {
            if ('distDif' in item) { return (item.distDif).toString() + ' ' + 'km' }
            return 'BOŞ'
          }
        },
        {
          key: 'totalDrvTime',
          label: 'Toplam Sürüş Süresi',
          sortable: true,
          class: 'text-center',
          formatter: (value, key, item) => {
            if ('totalDrvTime' in item) { return (item.totalDrvTime).toString() + ' ' + 'dk' }
            return 'BOŞ'
          }
        },
        {
          key: 'firstRlnt',
          label: 'İlk Rolanti',
          sortable: true,
          class: 'text-center',
          formatter: (value, key, item) => {
            if ('firstRlnt' in item) { return (item.firstRlnt).toString() + ' ' + 'dk' }
            return 'BOŞ'
          }
        },
        {
          key: 'totalRlnt',
          label: 'Ara Rolanti',
          sortable: true,
          class: 'text-center',
          formatter: (value, key, item) => {
            if ('totalRlnt' in item) { return (item.totalRlnt).toString() + ' ' + 'dk' }
            return 'BOŞ'
          }
        },
        {
          key: 'lastRlnt',
          label: 'Son Rolanti',
          sortable: true,
          class: 'text-center',
          formatter: (value, key, item) => {
            if ('lastRlnt' in item) { return (item.lastRlnt).toString() + ' ' + 'dk' }
            return 'BOŞ'
          }
        },
        {
          key: 'sumRlnt',
          label: 'Toplam Rolanti',
          sortable: true,
          class: 'text-center',
          formatter: (value, key, item) => {
            if ('sumRlnt' in item) { return (item.sumRlnt).toString() + ' ' + 'dk' }
            return 'BOŞ'
          }
        },
        {
          key: 'fuelRatio',
          label: 'Yakar Oranı',
          sortable: true,
          class: 'text-center',
          formatter: (value, key, item) => {
            if ('fuelRatio' in item) { return (item.fuelRatio).toString() + ' ' + 'gal/km' }
            return 'BOŞ'
          }
        },
        {
          key: 'fuelRatioR',
          label: 'Rolanti Sarfiyatı',
          sortable: true,
          class: 'text-center',
          formatter: (value, key, item) => {
            if ('fuelRatioR' in item) { return (item.fuelRatioR).toString() + ' ' + 'lt/dk' }
            return 'BOŞ'
          }
        },
        {
          key: 'fuel_consumption',
          label: 'Yakıt Sarfiyatı',
          formatter: (value, key, item) => {
            if ('fuelRatio' in item && 'distDif' in item) { return (item.fuelRatio * item.distDif).toString() + ' ' + 'gal' }
            return 'BOŞ'
          },
          sortable: true,
          sortByFormatted: true,
          filterByFormatted: true
        },
        {
          key: 'rlnt_consumption',
          label: 'Rolanti Sarfiyatı',
          formatter: (value, key, item) => {
            if ('fuelRatioR' in item && 'sumRlnt' in item) { return (item.fuelRatioR * item.sumRlnt).toString() + ' ' + 'lt' }
            return 'BOŞ'
          },
          sortable: true,
          sortByFormatted: true,
          filterByFormatted: true
        }
      ],
      items: [
        {
          id: 34,
          phoneNumber: '06-L432820-PICKUP',
          plate: 'L432820'
        },
        {
          id: 39,
          phoneNumber: '42-L383844-PICKUP',
          plate: 'L383844'
        },
        {
          id: 75,
          phoneNumber: 'A935581-VERNA',
          plate: 'A935581'
        }
      ]
    }
  },
  watch: {
    date (newVal) {
      this.getVehicleFenceReportData(newVal)
    }
  },
  methods: {
    toggleTimeRangePanel () {
      this.dateTimeOptions.showTimeRangePanel =
        !this.dateTimeOptions.showTimeRangePanel
    },
    handleRangeClose () {
      this.showTimeRangePanel = false
    },
    getVehicleFenceReportData (data) {
      debugger
      useJwt
        .post(endpoints.getVehicleDistanceReport, {
          endDate: data[1],
          startDate: data[0]
        })
        .then((res) => {
          this.items = res.data.data
        })
    }
  }
}
</script>

<style>
</style>
