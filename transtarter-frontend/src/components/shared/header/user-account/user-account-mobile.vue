<template>
    <div class="mobile-header__menu__right">
        <!-- <div class="menu-item">
            <div class="map-alt"></div>
        </div> -->

        <div class="menu-item" v-if="loggedIn && !loggingIn" @click="goToCart()">
            <div class="shopping-cart"></div>
            <span v-if="cartAggregateAmount" class="notify-counter">{{ cartAggregateAmount }}</span>
        </div>
        <li class="menu-item" v-if="loggedIn && !loggingIn" @click="goToOrders()">
            <svg-list class="desktop-header__svg-list" />
        </li>
        <div
            v-if="isParterRestricted && loggedIn && !loggingIn"
            class="menu-item desktop-header__warning"
            @click="openRestrictionModal"
        >
            <i class="el-icon-warning"></i>
        </div>
        <div id="user-menu" class="menu-item">
            <!-- block for guests -->

            <div class="new-user" @click="toggleUserMenu()" v-if="!loggedIn"></div>

            <!-- end for guests -->
            <!-- block for users -->
            <div class="user-avatar" v-if="loggedIn" @click="toggleUserMenu()"></div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AuthModule } from '@/store/modules/authentication.module'
import { store } from '@/store/index'
import { DisplayModule } from '../../../../store/modules/display.module'
import SvgList from '@/components/svg/svg-list.vue'

@Component({
    components: { SvgList },
})
export default class UserAccountMobile extends Vue {
    private webAppHost = process.env.VUE_APP_WEB_APP
    private webApi = process.env.VUE_APP_WEB_APP_API

    get loggedIn() {
        return AuthModule.logged
    }

    get loggingIn() {
        return AuthModule.loggingIn
    }

    get cartAggregateAmount() {
        return AuthModule.itemsAmount
    }

    get isParterRestricted() {
        return Boolean(AuthModule.isOrderingDisabled)
    }

    toggleUserMenu() {
        store.dispatch('display/toggleBlockShowUser')
    }

    openRestrictionModal() {
        store.dispatch('display/setContragentRestrictionModal', true)
    }

    goToCart() {
        window.location.href = `${this.webAppHost}/account/cart`
    }

    goToOrders() {
        window.location.href = `${this.webAppHost}/account/orders`
    }
}
</script>

<style lang="scss"></style>
