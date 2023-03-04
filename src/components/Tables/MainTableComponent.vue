<template>
  <div class="col col-12 col-md-12">
    <div class="row d-flex justify-content-between mb-2 mt-2">
      <div
        class="col col-12 col-sm-3 col-md-3 col-lg-3 col-xl-3 mb-2"
        v-if="_filter"
      >
        <b-form-group
          label="Arama Filtresi"
          label-for="filter-input"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Arama Yapalirsiniz"
            >
            </b-form-input>
            <b-input-group-append>
              <b-button
                :disabled="!filter"
                @click="filter = ''"
              >Temizle</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </div>
      <div
        class="col col-12 col-sm-3 col-md-3 col-lg-3 col-xl-3 d-flex align-items-end justify-content-center"
        v-if="_filterOn"
      >
        <b-button
          class="mb-2"
          :class="visible ? null : 'collapsed'"
          :aria-expanded="visible ? 'true' : 'false'"
          aria-controls="collapse-4"
          @click="visible = !visible"
        >
          KOLON SEÇİMİ
        </b-button>
      </div>
      <div class="col col-12 col-sm-3  d-flex align-items-end justify-content-center">
        <export-excel
          class   = "btn btn-warning"
          :data   = "items"
          :fields = "exportData"
          worksheet = "Rapor"
          name    = "export.xls">
          EXCEL EXPORT
        </export-excel>
      </div>
      <div
        class="col col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 "
        v-if="_perPage"
      >
        <b-form-group
          label="Satır Sayısı"
          label-for="per-page-select"
          label-cols-sm="6"
          label-cols-md="4"
          label-cols-lg="4"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-form-select
            id="per-page-select"
            v-model="perPage"
            :options="pageOptions"
            class="form-control"
          ></b-form-select>
        </b-form-group>
      </div>
    </div>

    <div
      class="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"
      v-if="_filterOn"
    >
      <b-collapse
        id="collapse-4"
        v-model="visible"
        class="mt-2"
      >
        <b-card>
          <b-form-group
            label="TABLODA LİSTELENECEK KOLONLARI SEÇEBİLİRSİNİZ..."
            description=""
            label-cols-sm="3"
            label-align-sm="right"
            label-size="sm"
            class="mb-0"
          >
            <b-form-checkbox-group
              v-model="filterOn"
              class="mt-1 d-flex"
            >
              <b-form-checkbox
                v-for="(field, index) in fields"
                :key="index"
                :value="field.key"
              >{{field.label}}</b-form-checkbox>
            </b-form-checkbox-group>
          </b-form-group>
        </b-card>
      </b-collapse>
    </div>

    <b-table
      :items="items"
      :fields="headers"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      stacked="md"
      show-empty
      small
      @filtered="onFiltered"
    >
    </b-table>

    <b-pagination
      v-model="currentPage"
      :total-rows="totalRows"
      :per-page="perPage"
      pills
      align="right"
      size="sm"
      class="my-0"
    >
    </b-pagination>
  </div>
</template>

<script>
export default {
  name: 'MainTableComponent',
  props: {
    items: {
      type: Array,
      default: () => []
    },
    fields: {
      type: Array,
      default: () => []
    },
    _currentPage: {
      type: Number,
      default: 1
    },
    _perPage: {
      type: Boolean,
      default: true
    },
    _filter: {
      type: Boolean,
      default: true
    },
    _filterOn: {
      type: Boolean,
      default: true
    },
    _sortDesc: {
      type: Boolean,
      default: false
    },
    sortDirection: {
      type: String,
      default: 'asc'
    },
    _sortBy: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      totalRows: 0,
      sortDesc: this._sortDesc,
      currentPage: this._currentPage,
      filter: '',
      sortBy: '',
      visible: false,
      perPage: 10,
      pageOptions: [5, 10, 15, { value: 100, text: 'Hepsini göster' }],
      filterOn: [],
      headers: this.fields
    }
  },
  mounted () {
    this.totalRows = this.items.length
  },
  computed: {
    exportData () {
      const returnData = {}
      for (const item of this.headers) {
        returnData[item.label] = item.key
      }
      return returnData
    }
  },
  watch: {
    sortDesc (newVal) {
      this.sortDesc = newVal
      this.$emit('update:_sortDesc', newVal)
    },
    currentPage (newVal) {
      this.$emit('update:_currentPage', newVal)
    },
    sortBy (newVal) {
      this.$emit('update:_sortBy', newVal)
    },
    filterOn (newVal) {
      if (newVal.length > 0) {
        this.headers = this.fields.filter((item) => {
          return newVal.includes(item.key)
        })
      } else {
        this.headers = this.fields
      }
    }
  },
  methods: {
    onFiltered (filteredItems) {
      this.totalRows = filteredItems.length
      // eslint-disable-next-line vue/no-mutating-props
      this.currentPage = 1
      this.$emit('update:currentPage', this.currentPage)
    }
  }
}
</script>

<style>
.custom-checkbox {
  margin-right: 10px;
}
.custom-control-label {
  margin-left: 5px;
}
</style>
