import Vue from 'vue'
import AppModal from '@/components/core-ui/app-modal/app-modal'

const components = {
    AppModal,
}

Object.entries(components).forEach(([name, component]) => {
    Vue.component(name, component)
})
