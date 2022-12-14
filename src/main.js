import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import components
import './global_components'

// import assets styles
import './assets/scss/main.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
