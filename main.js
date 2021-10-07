import Vue from 'vue'
import App from './App'
import uView from "uview-ui";

import { myRequest } from './util/app.js'
import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)
Vue.use(uView);
Vue.prototype.$myRequest = myRequest

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
