<template>
    <div class="mobile-header__menu__right">
        <div class="menu-item">
            <div class="map-alt"></div>
        </div>

        <div class="menu-item">
            <div class="shopping-cart"></div>
            <span class="notify-counter">9</span>
        </div>

        <div class="menu-item">
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

@Component
export default class UserAccountMobile extends Vue {
    get loggedIn() {
        return AuthModule.logged
    }

    toggleUserMenu() {
        setTimeout(() => {
            store.dispatch('display/toggleBlockShowUser')
        })
    }
}
</script>

<style lang="scss"></style>
