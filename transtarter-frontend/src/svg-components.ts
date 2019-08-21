import Vue from 'vue'
import SvgCar from '@/components/svg/svg-car.vue'
import SvgPicture from '@/components/svg/svg-picture.vue'
import SvgCart from '@/components/svg/svg-cart.vue'
import SvgCartWithX from '@/components/svg/svg-cart-with-x.vue'
import SvgFilter from '@/components/svg/svg-filter.vue'
import SvgTruck from '@/components/svg/svg-truck.vue'
import SvgCheck from '@/components/svg/svg-check.vue'
import SvgOptions from '@/components/svg/svg-options.vue'
import SvgOrder from '@/components/svg/svg-order.vue'
import SvgPlus from '@/components/svg/svg-plus.vue'
import SvgMinus from '@/components/svg/svg-minus.vue'
import SvgCross from '@/components/svg/svg-cross.vue'
import SvgCalendar from '@/components/svg/svg-calendar.vue'
import SvgPencil from '@/components/svg/svg-pencil.vue'
import SvgList from '@/components/svg/svg-list.vue'
import SvgInstagram from '@/components/svg/svg-instagram.vue'

const components = {
    SvgCar,
    SvgCart,
    SvgCartWithX,
    SvgPicture,
    SvgFilter,
    SvgTruck,
    SvgCheck,
    SvgOptions,
    SvgOrder,
    SvgPlus,
    SvgMinus,
    SvgCross,
    SvgCalendar,
    SvgPencil,
    SvgList,
    SvgInstagram,
}

Object.entries(components).forEach(([name, component]) => {
    Vue.component(name, component)
})
