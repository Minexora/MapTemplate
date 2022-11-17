<template>
    <div>
      <l-control class="custom-control-rigth">
        <div class="icon_div" @click="showPanelExit">
          <b-icon icon="lock-fill"></b-icon>
        </div>
      </l-control>

      <l-control class="custom-control-rigth">
        <div class="icon_div" @click="showPanelSettings">
          <b-icon icon="gear-fill"></b-icon>
        </div>
      </l-control>

      <l-control class="custom-control-left" position="bottomleft">
        <div class="icon_div" @click="showPanelListMenu">
          <b-icon icon="text-center"></b-icon>
        </div>
      </l-control>

    </div>
</template>

<script>
import { LControl } from 'vue2-leaflet'
export default {
  name: 'MapControl',
  components: {
    'l-control': LControl
  },
  data () {
    return {
      sidebar_data: {
        isShow: false,
        title: '',
        position: '',
        show_side: false,
        content: ''
      }
    }
  },
  methods: {
    showPanelListMenu () {
      this.sidebar_data.title = 'Araç Listesi'
      this.sidebar_data.position = 'left'
      this.sidebar_data.show_side = true
      this.sidebar_data.isShow = true
      this.sidebar_data.content = 1
      this.$store.commit('sidebar/set_sidebarData', this.sidebar_data)
      // this.log()
    },
    showPanelSettings () {
      this.sidebar_data.title = 'Settings Menu'
      this.sidebar_data.position = 'right'
      this.sidebar_data.show_side = true
      this.sidebar_data.isShow = true
      this.sidebar_data.content = 2
      this.$store.commit('sidebar/set_sidebarData', this.sidebar_data)
      // this.log()
    },

    showPanelExit () {
      this.sidebar_data.title = 'ÇIKIŞ'
      this.sidebar_data.position = 'right'
      this.sidebar_data.show_side = true
      this.sidebar_data.isShow = true
      this.sidebar_data.content = 3
      this.$store.commit('sidebar/set_sidebarData', this.sidebar_data)
      // this.log()
    },
    log () {
      console.log(this.sidebar_data)
    }
  }
}
</script>

<style lang="scss">
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
    .custom-control-left {
      position: absolute;
      left: 0;
      margin-left: 0px !important;
      font-size: 21px;
      color: white;
      width: 49px;
      background-color: rgba(47,64,80,0.9);
      border-radius: 0px 20px 20px 0px;
    }
    .custom-control-rigth {
      position: absolute;
      left: 0;
      margin-right: 0px !important;
      font-size: 21px;
      color: white;
      width: 49px;
      background-color: rgba(47,64,80,0.9);
      border-radius: 20px 0px 0px 20px;
    }
    .leaflet-touch .leaflet-bar a {
      background-color: rgba(47,64,80,0.9);
      color: white;
      border: 1px solid rgba(47,64,81,1)
    }
</style>
