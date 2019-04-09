import Vue from 'vue'
import App from './App'
import {
    CDN
} from '@/common/libs/util/index.js'

Vue.config.productionTip = false

Vue.prototype.$CDN = CDN;  

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
