<!-- eslint-disable vue/multi-word-component-names -->
<template>

  <b-sidebar ref="_sidebar" :visible="isShow" :right="position === 'right'" @change="changeSidebar" sidebar-class="custom-body" no-header shadow>
    <template #default="{ hide }">
        <div class="d-flex flex-row justify-content-center align-items-center font-weight-bold">
          <div class="col col-12 col-md-2 p-2">
            <b-button variant="outline-danger" block @click="hide">X</b-button>
          </div>
          <h2 class="col col-12 col-md-10 m-0">{{title}}</h2>
        </div>
        <!-- TODO: Buraya menu componenti yazılacak! -->

        <car-list  class="mt-4" v-if="content === 1"/>

        <div v-if="content === 2">
          <b-button @click="showModal">Open Modal</b-button>
          <b-modals :isShow.sync="modal"  :size="'xl'" :title="'Deneme'" />
        </div>

      </template>
  </b-sidebar>
</template>

<script>
import { BSidebar } from 'bootstrap-vue'
import ModalComponent from '@/components/ModalComponent.vue'
import CarListComponent from '@/components/Cars/CarListComponent.vue'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Sidebar',
  components: {
    'b-sidebar': BSidebar,
    'b-modals': ModalComponent,
    // eslint-disable-next-line vue/no-unused-components
    'car-list': CarListComponent
  },
  data () {
    return {
      modal: false,
      isShow: false,
      title: '',
      content: '',
      position: ''
    }
  },
  computed: {
    getSidebarData () {
      return this.$store.getters['sidebar/get_sidebarData']
    }
  },
  watch: {
    getSidebarData (newData, oldData) {
      this.isShow = newData.isShow
      this.title = newData.title
      this.content = newData.content
      this.position = newData.position
    }
  },
  methods: {
    changeSidebar (newVal) {
      this.$store.commit('sidebar/set_sidebarData', {
        isShow: newVal,
        title: this.title,
        content: this.content,
        position: this.position
      })
    },
    showModal () {
      this.modal = true
    }
  }
}
</script>

<style>
  .b-sidebar-outer
  .custom-body {
      font-size: 16px;
      color: white !important;
      width: 420px !important;
      width: 40px;
      background-color: rgba(47,64,80,0.9) !important;
    }

</style>
