import Vue from 'vue'
import Router from 'vue-router'
import UserSettings from '@/components/user-profile/profile-settings/profile-settings.vue'
import ProfileOrders from '@/components/user-profile/profile-home/profile-home.vue'
import ProfileCart from '@/components/user-profile/profile-cart/profile-cart.vue'
import StyleGuide from '@/components/shared/styleguide.vue'
import { envArgs } from './env'

Vue.use(Router)

const vueRoutes = [
    {
        path: '/',
        name: 'home',
        component: ProfileOrders,
    },
    {
        path: '/settings',
        name: 'settings',
        component: UserSettings,
    },
    {
        path: '/cart',
        name: 'cart',
        component: ProfileCart,
    },
    {
        path: '/search-matches',
        name: 'search-matches',
        component: ProfileCart,
    },
]

if (envArgs.isServeBuild) {
    vueRoutes.push({
        path: '/style-guide',
        name: 'style-guide',
        component: StyleGuide,
    })
}

export default new Router({
    mode: 'history',
    base: '/new/account',
    routes: vueRoutes,
})
