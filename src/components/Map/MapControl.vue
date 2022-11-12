<template>
    <div>
      <l-control class="custom-control">
        <div class="icon_div" @click="showPanelSettings">
          <b-icon icon="gear-fill"></b-icon>
        </div>
      </l-control>

      <l-control class="custom-control" position="bottomleft">
        <div class="icon_div" @click="showPanelListMenu">
          <b-icon icon="text-center"></b-icon>
        </div>
      </l-control>

      <b-sidebar :isShow.sync="sidebar_data.show_side" :title="sidebar_data.title" :content="sidebar_data.content" :position="sidebar_data.position" />
    </div>
</template>

<script>
import { LControl } from 'vue2-leaflet'
import Sidebar from '@/components/Sidebar/SideComponent.vue'
export default {
  name: 'MapControl',
  components: {
    'l-control': LControl,
    'b-sidebar': Sidebar
  },
  data () {
    return {
      sidebar_data: {
        title: '',
        position: '',
        show_side: false,
        content: ''
      }
    }
  },
  methods: {
    showPanelListMenu () {
      this.sidebar_data.title = 'List Menu'
      this.sidebar_data.position = 'left'
      this.sidebar_data.show_side = true
      // alert('showPanelListMenu Click!')
      // this.log()
    },
    showPanelSettings () {
      this.sidebar_data.title = 'Settings Menu'
      this.sidebar_data.position = 'right'
      this.sidebar_data.show_side = true
      // alert('showPanelSettings Click!')
      // this.log()
    },
    log () {
      console.log(this.sidebar_data)
    }
  }
}
</script>

<style>
    .custom-control {
        display:block;
        color: currentColor;
        text-align:center;
        font-size:2em;
        cursor: pointer !important;
        border: 1px solid rgba(0,0,0,0.5);
        border-bottom: 3px solid rgba(0,0,0,0.5);
        border-radius: 100% !important;
        -moz-border-radius: 3px;
        -webkit-border-radius: 3px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.5), /* Exterior Shadow */
          inset 0 1px rgba(255,255,255,0.3), /* Top light Line */
          inset 0 10px rgba(255,255,255,0.2), /* Top Light Shadow */
          inset 0 10px 20px rgba(255,255,255,0.25), /* Sides Light Shadow */
          inset 0 -15px 30px rgba(0,0,0,0.3); /* Dark Background */
        -webkit-box-shadow: 0 2px 8px rgba(0,0,0,0.5),
          inset 0 1px rgba(255,255,255,0.3),
          inset 0 10px rgba(255,255,255,0.2),
          inset 0 10px 20px rgba(255,255,255,0.25),
          inset 0 -15px 30px rgba(0,0,0,0.3);
        -moz-box-shadow: 0 2px 8px rgba(0,0,0,0.5),
          inset 0 1px rgba(255,255,255,0.3),
          inset 0 10px rgba(255,255,255,0.2),
          inset 0 10px 20px rgba(255,255,255,0.25),
          inset 0 -15px 30px rgba(0,0,0,0.3);
    }
    .custom-control > p {
          margin: 0px;
    }
    .icon_div {
      width: 100%;
      height: 100%;
      padding:5px 10px;
    }

</style>
