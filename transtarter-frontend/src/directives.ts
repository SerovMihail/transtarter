import Vue from 'vue'
import { closable } from '@/directives/v-click-outside-exclude'
import VueTooltip from 'v-tooltip'
import vClickOutside from 'v-click-outside'

Vue.use(vClickOutside)
const directives = {
    closable,
}

Object.entries(directives).forEach(([name, directive]) => {
    Vue.directive(name, directive)
})

Vue.use(VueTooltip)
