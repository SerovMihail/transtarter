import Vue from 'vue'
import App from './App.vue'
import router from './router' // we don't use router at all right now
import { store } from './store/index'
import AppSelect from '@/components/core-ui/app-select/app-select'
import { closable } from '@/directives/v-click-outside-alt'

Vue.config.productionTip = false
export const eventBus = new Vue()
Vue.component('AppSelect', AppSelect)
Vue.directive('closable', closable)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
