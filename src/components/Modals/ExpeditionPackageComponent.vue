<template>
  <main-table-component  :fields="headers" :items="items"  />
</template>

<script>
import MainTableComponent from '@/components/Tables/MainTableComponent.vue'
export default {
  name: 'ExpeditionPackageComponent',
  components: {
    MainTableComponent
  },
  data () {
    return {
      headers: [
        { key: 'name', label: 'Person full name', sortable: true, sortDirection: 'desc' },
        { key: 'age', label: 'Person age', sortable: true, class: 'text-center' },
        {
          key: 'isActive',
          label: 'Is Active',
          formatter: (value, key, item) => {
            return value ? 'Yes' : 'No'
          },
          sortable: true,
          sortByFormatted: true,
          filterByFormatted: true
        }
      ],
      items: [
        { isActive: true, age: 40, name: { first: 'Dickerson', last: 'Macdonald' } },
        { isActive: false, age: 21, name: { first: 'Larsen', last: 'Shaw' } },
        {
          isActive: false,
          age: 9,
          name: { first: 'Mini', last: 'Navarro' },
          _rowVariant: 'success'
        }
      ]
    }
  }

}
</script>

<style>

</style>
