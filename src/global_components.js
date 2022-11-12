import Vue from 'vue'
import { BootstrapVue, IconsPlugin, ModalPlugin, ToastPlugin, BootstrapVueIcons } from 'bootstrap-vue'
import { Icon } from 'leaflet'

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
