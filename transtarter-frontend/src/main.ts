import Vue from 'vue'
import App from './App.vue'

import { store } from './store/index'

Vue.config.productionTip = false

export const eventBus = new Vue()

new Vue({
    store,
    render: h => h(App),
}).$mount('#app')
