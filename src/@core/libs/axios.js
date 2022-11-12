import Vue from 'vue'

// axios
import axios from 'axios'

const axiosIns = axios.create({})

Vue.prototype.$http = axiosIns

export default axiosIns
