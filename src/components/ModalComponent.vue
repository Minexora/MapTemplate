<template>
    <b-modal
    :dialog-class="size==='xl' ? 'large-modal': ''"
    v-model="getIsShow"
    :size="size"
    :title="title"
    scrollable
    centered
    header-bg-variant="dark"
    header-text-variant="warning"
    :ok-only="okOnly"
    :hide-footer="hideFooter"
    >
        Hello Extra Large Modal! {{size}}
    </b-modal>
</template>

<script>
export default {
  name: 'ModalComponent',
  props: {
    size: {
      type: String,
      default: 'xl'
    },
    title: {
      type: String,
      required: true
    },
    isShow: {
      type: Boolean,
      default: false
    },
    okOnly: {
      type: Boolean,
      default: false
    },
    hideFooter: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    getIsShow: {
      get () {
        return this.isShow
      },
      set (newVal) {
        this.$emit('update:isShow', newVal)
      }
    }
  }
}
</script>

<style>
.large-modal {
    width: calc( 100% - 50px ) !important;
    max-width: calc( 100% - 50px ) !important;
}
.modal-dialog .close{
    background-color: transparent;
    border-color: #ffc107;
    border-radius: 100%;
}

</style>
