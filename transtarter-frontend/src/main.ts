import Vue from 'vue'
import App from './App.vue'
import './filters'
import './svg-components'
import './directives'
import './core-ui'
import './element-ui'
import { store } from './store/index'
import YmapPlugin from 'vue-yandex-maps'
const yaMapSettings = {
    apiKey: '64a23fa1-6705-4827-978a-ab84dc6ad5ad&lang=ru_RU',
}
Vue.use(YmapPlugin, yaMapSettings)
Vue.config.productionTip = false

export const eventBus = new Vue()

new Vue({
    store,
    render: h => h(App),
}).$mount('#app')
