import Vue from 'vue'
import App from './App.vue'
import VueMq from 'vue-mq'

import { store } from './store/index'

// import VueRouter from 'vue-router'
// Vue.use(VueRouter)
// const router = new VueRouter()

/* Breakpoint configuration should be in line with  assets/scss/mixins/_media-queries.scss file */
Vue.use(VueMq, {
    breakpoints: {
        mobilePhone: 450,
        tablet: 768,
        mobile: 1200,
        laptop: 1440,
        desktop: Infinity,
    },
})

Vue.config.productionTip = false
export const eventBus = new Vue()

new Vue({
    store,
    render: h => h(App),
}).$mount('#app')
