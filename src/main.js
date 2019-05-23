import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Utils from '@/lib/utils.js'
import Bus from '@/lib/bus.js'
import '@/assets/normalize/normalize.css'

Vue.config.productionTip = false

Vue.use(Utils)
Vue.use(Bus)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
