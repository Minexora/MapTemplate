<template>
    <l-tooltip :options="{ permanent: false, interactive: true }"  v-if="data">
        <div @click="$emit('innerClick')">
            {{data.title}}
            <p>
                {{data.content}}
            </p>
        </div>
    </l-tooltip>
</template>

<script>
import { LTooltip } from 'vue2-leaflet'
export default {
  name: 'MapTooltip',
  components: {
    'l-tooltip': LTooltip
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
