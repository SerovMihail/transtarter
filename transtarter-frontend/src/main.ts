import Vue from 'vue'
import App from './App.vue'
import './filters'
import './svg-components'
import './directives'
import './core-ui'

import { store } from './store/index'

Vue.config.productionTip = false

export const eventBus = new Vue()

new Vue({
    store,
    render: h => h(App),
}).$mount('#app')
