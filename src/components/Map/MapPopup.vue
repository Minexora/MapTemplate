<template>
    <l-popup v-if="data">
        <div @click="$emit('innerClick')">
            Araç : {{data.title}}
            <p>
                Imei : {{data.content}}
            </p>
        </div>
    </l-popup>
</template>

<script>
import { LPopup } from 'vue2-leaflet'
export default {
  name: 'MapPopup',
  components: {
    'l-popup': LPopup
  },
  props: {
    data: {
      type: Object
    }
  }
}
</script>

<style>

</style>
