<!-- eslint-disable vue/multi-word-component-names -->
<template>

  <b-sidebar ref="_sidebar" :visible="isShow" :right="position === 'right'" @change="changeSidebar" no-header shadow>
    <template #default="{ hide }">
        <div class="d-flex flex-row justify-content-center align-items-center font-weight-bold">
          <div class="col col-12 col-md-2 p-2">
            <b-button variant="outline-danger" block @click="hide">X</b-button>
          </div>
          <h2 class="col col-12 col-md-10 m-0">{{title}}</h2>
        </div>
        <!-- TODO: Buraya menu componenti yazılacak! -->
        <b-button @click="showModal">Open Modal</b-button>
        <b-modals :isShow.sync="modal"  :size="'xl'" :title="'Deneme'" />
        <car-list />
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
      modal: false
    }
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    position: {
      type: String,
      required: true
    }
  },
  methods: {
    changeSidebar (newVal) {
      this.$emit('update:isShow', newVal)
    },
    showModal () {
      this.modal = true
    }
  }
}
</script>

<style>

</style>
