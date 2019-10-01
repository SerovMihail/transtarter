<template>
    <ul class="desktop-header__login">
        <li
            class="desktop-header__login-item desktop-header__login-item_icon-cart"
            :class="{ 'desktop-header__login-item_icon-cart--empty-cart': !cartAggregateAmount }"
            v-if="loggedIn && !loggingIn"
            @click="goToCart()"
        >
            <span v-if="cartAggregateAmount" class="icon-shopping-cart desktop-header__icon-cart">
                <i>{{ cartAggregateAmount }}</i>
            </span>
            <div class="shopping-cart"></div>
        </li>
        <li
            class="desktop-header__login-item"
            v-if="loggedIn && !loggingIn"
            v-tooltip.bottom="'Заказы и оплаты'"
            @click="goToOrders()"
        >
            <svg-list class="desktop-header__svg-list" />
        </li>
        <div
            v-if="isParterRestricted && loggedIn && !loggingIn"
            class="desktop-header__login-item desktop-header__warning"
            @click="openRestrictionModal"
        >
            <i class="el-icon-warning"></i>
        </div>
        <!-- block for guests -->
        <li class="desktop-header__login-item" v-if="loggingIn">
            Загрузка...
        </li>
        <li class="desktop-header__login-item" @click="logIn()" v-if="!loggedIn && !loggingIn">
            <a class="border">Вход</a>
        </li>
        <li
            class="desktop-header__login-item"
            @click="toggleRegistrationPopup()"
            v-if="!loggedIn && !loggingIn"
        >
            <a class="border register">Регистрация</a>
        </li>
        <!-- end for guests -->
        <!-- block for users -->
        <div
            v-if="loggedIn && !loggingIn && !singleContrAgent && contrAgent"
            class="desktop-header__login-item"
            @click="toggleContrAgent"
        >
            {{ contrAgent }}
        </div>
        <div
            class="desktop-header__login-item user-info"
            id="user-menu-desktop"
            v-if="loggedIn && !loggingIn"
            @click="toggleUserMenu()"
        >
            <div v-if="!avatarTimestamp" class="user-avatar"></div>
            <div v-else class="user-avatar" :style="`background-image: url('${imageUrl}')`"></div>
            <div class="user-name border-white">{{ userName }}</div>
        </div>
        <!-- end block for users -->
    </ul>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { AuthModule } from '@/store/modules/authentication.module'
import { store } from '@/store/index'
import axios from '@/services/axios.service.ts'
import { ICartInfo } from '@/models'
import VueTooltip from 'v-tooltip'
import SvgList from '@/components/svg/svg-list.vue'

Vue.use(VueTooltip)
// Vue.directive(VueTooltip)
@Component({
    components: { SvgList },
    directives: { VueTooltip },
})
export default class UserAccountDesktop extends Vue {
    private webAppHost = process.env.VUE_APP_WEB_APP
    private webApi = process.env.VUE_APP_WEB_APP_API

    cartInfo: ICartInfo = {}
    get cartAggregateAmount() {
        return AuthModule.itemsAmount
    }
    get loggedIn() {
        return AuthModule.logged
    }
    get loggingIn() {
        return AuthModule.status.isLoading
    }
    get avatarTimestamp() {
        if (AuthModule.profile) {
            // @ts-ignore
            return AuthModule.profile.avatarTimestamp
        }
    }

    get userId() {
        if (AuthModule.profile) {
            // @ts-ignore
            return AuthModule.profile.id
        }
    }

    get userName() {
        return AuthModule.name.length > 10
            ? AuthModule.name.substring(0, 10) + '...'
            : AuthModule.name
    }

    get contrAgent() {
        if (AuthModule.contragent) {
            // @ts-ignore
            return AuthModule.contragent.name || ''
        } else {
            return ''
        }
    }
    get singleContrAgent() {
        return AuthModule.contragentIsSingle
    }

    get imageUrl() {
        return `${this.webApi}/api/profiles/${this.userId}/avatar?t=${this.avatarTimestamp}`
    }

    get isParterRestricted() {
        return Boolean(AuthModule.isOrderingDisabled)
    }

    async mounted() {
        if (this.loggedIn) {
            store.dispatch('auth/setInitialItemsAmount')
        }
    }

    goToCart() {
        window.location.href = `${this.webAppHost}/account/cart`
    }

    goToOrders() {
        window.location.href = `${this.webAppHost}/account/orders`
    }

    toggleContrAgent() {
        store.dispatch('display/toggleContrAgentModal')
    }

    logIn() {
        store.dispatch('auth/login')
    }

    toggleRegistrationPopup() {
        store.dispatch('display/toggleRegistration')
    }

    toggleUserMenu() {
        setTimeout(() => {
            store.dispatch('display/toggleBlockShowUser')
        })
    }

    openRestrictionModal() {
        store.dispatch('display/setContragentRestrictionModal', true)
    }
}
</script>

<style lang="scss">
.desktop-header {
    &__warning {
        $color: #c73131;
        background-color: $color;
        &:hover {
            background-color: lighten($color, 8%) !important;
        }
    }
    &__old-site-btn {
        color: #ffec5a;
        font-size: 20px;
    }
    &__login {
        display: flex;
        height: 100%;
    }
    &__login-item {
        cursor: pointer;
        height: 100%;
        border-left: 1px solid $dove-gray;
        padding-left: 10px;
        display: flex;
        align-items: center;
        &_icon-cart {
            position: relative;
            padding-right: 40px !important;
            margin-right: 0 !important;
            &.nuxt-link-exact-active {
                cursor: default !important;
            }
            &--empty-cart {
                padding-right: 10px !important;
            }
        }
    }
    .shopping-cart {
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='13' viewBox='0 0 16 13' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M12.9999 10C13.5588 10 14 10.4411 14 10.9999C14 11.5589 13.5588 12 12.9999 12C12.4412 12 12 11.5589 12 10.9999C12 10.4411 12.4115 10 12.9999 10ZM7 10C7.55882 10 8 10.4411 8 10.9999C8 11.5589 7.55882 12 7 12C6.44118 12 6 11.5589 6 10.9999C6 10.4411 6.44118 10 7 10ZM7 9C5.8932 9 5 9.91258 5 10.9999C5 12.0874 5.91262 13 7 13C8.08738 13 9 12.0874 9 10.9999C9 9.91258 8.1068 9 7 9ZM13 9C11.8932 9 11 9.91258 11 10.9999C11 12.0874 11.9126 13 13 13C14.0876 13 15 12.0874 15 10.9999C15 9.91258 14.0876 9 13 9ZM0.597802 0.0173156C0.263736 0.0173156 0 0.27705 0 0.606048C0 0.935045 0.263736 1.19478 0.597802 1.19478H2.28571L3.86813 7.09941C4.00879 7.6362 4.48352 8 5.04615 8H6.38242H12.5187H13.2747C13.8198 8 14.2769 7.6362 14.4352 7.13422L16 1.80083H14.7341L13.2747 6.80505H5.04615L3.46374 0.900587C3.32308 0.363628 2.84835 0 2.28571 0H0.597802V0.0173156Z' fill='white'/%3E%3C/svg%3E");
        display: flex;
        width: 60%;
        height: 100%;
        background-repeat: no-repeat;
        background-position: center;
    }
    &__icon-cart {
        position: relative;
        i {
            position: absolute;
            top: -10px;
            right: -50px;
            width: 20px;
            height: 20px;
            background-color: $amber-approx;
            border-radius: 50%;
            color: $black;
            display: flex;
            font-weight: 600;
            font-size: 12px;
            font-family: 'PT Sans';
            justify-content: center;
            padding-top: 3px;
            z-index: 2;
        }

        &::after {
            content: '';
            position: absolute;
            width: 10px;
            height: 21px;
            border-top-right-radius: 34%;
            -webkit-transform: rotate(-60deg) skewX(-30deg) scale(1, 0.866);
            transform: rotate(-142deg) skewX(-15deg) scale(1, 0.466);
            background: $amber-approx;
            top: -10.4px;
            left: 27.4px;
        }
    }
    .user-info {
        display: flex;
        align-items: center;
        width: auto;
        border-left: 1px solid $dove-gray;
        padding-right: 16px;
        cursor: pointer;

        &:hover {
            background-color: $dove-gray;
        }
        .user-avatar {
            background-image: url('data:image/jpeg;base64,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');
            background-position: center;
            background-size: cover;
            width: 32px;
            height: 32px;
            // margin-left: 8px;
            border-radius: 50%;
            border: 3px solid $white;
            pointer-events: none;
        }
        .user-name {
            margin-left: 8px;
        }
    }
    ::v-deep &__svg-list {
        height: 19px;
        fill: white;
    }
    .el-icon-warning-outline,
    .el-icon-warning {
        font-size: 20px;
        color: white;
        // color: $amber-approx;
    }
}
</style>
