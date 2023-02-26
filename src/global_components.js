import Vue from 'vue'
import { Icon } from 'leaflet'
import VueCrontab from 'vue-crontab'
import { BootstrapVue, IconsPlugin, ModalPlugin, ToastPlugin, BootstrapVueIcons } from 'bootstrap-vue'

Vue.use(VueCrontab)
Vue.use(ToastPlugin)
Vue.use(ModalPlugin)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(BootstrapVueIcons)

delete Icon.Default.prototype._getIconUrl
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})
