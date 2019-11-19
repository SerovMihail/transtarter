<template>
    <div class="mobile-header__menu__right">
        <div class="mobile-header__loading" v-if="loggingIn">
            Загрузка...
        </div>
        <a
            class="menu-item"
            v-if="loggedIn && !loggingIn"
            :href="`${this.webAppHost}/account/cart`"
        >
            <div class="shopping-cart"></div>
            <span v-if="cartAggregateAmount" class="notify-counter">{{ cartAggregateAmount }}</span>
        </a>
        <a
            class="menu-item"
            v-if="loggedIn && !loggingIn"
            :href="`${this.webAppHost}/account/orders`"
        >
            <svg-list class="desktop-header__svg-list" />
        </a>
        <div
            v-if="isParterRestricted && loggedIn && !loggingIn"
            class="menu-item desktop-header__warning"
            @click="openRestrictionModal"
        >
            <i class="el-icon-warning"></i>
        </div>
        <div v-if="!loggingIn" id="user-menu" class="menu-item">
            <div v-if="!loggedIn" class="new-user" @click="toggleUserMenu"></div>
            <template v-else>
                <div v-if="!avatarTimestamp" class="user-avatar" @click="toggleUserMenu()"></div>
                <div
                    v-else
                    class="user-avatar"
                    :style="`background-image: url('${imageUrl}')`"
                    @click="toggleUserMenu()"
                ></div>
            </template>
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

    get imageUrl() {
        return `${this.webApi}/api/profiles/${this.userId}/avatar?t=${this.avatarTimestamp}`
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

<style lang="scss">
.mobile-header {
    &__loading {
        padding-right: 8px;
    }
    &__warning {
        $color: #c73131;
        background-color: $color;
        &:hover {
            background-color: lighten($color, 8%) !important;
        }
    }
    .el-icon-warning-outline,
    .el-icon-warning {
        font-size: 20px;
        color: white;
    }
}
</style>
