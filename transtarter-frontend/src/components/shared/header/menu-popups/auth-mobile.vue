<template>
    <div class="menu-popup" v-if="showBlocksShowUser && !loggedIn">
        <ul class="menu-popup_list" v-click-outside="closeUserMenu">
            <li class="menu-popup_list-item" @click="logIn()">
                <a>Вход</a>
            </li>
            <li class="menu-popup_list-item" @click="toggleRegistrationPopup()">
                <a class="register">Регистрация</a>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { AuthModule } from '@/store/modules/authentication.module'
import { DisplayModule } from '@/store/modules/display.module'
import { clickOutside } from '@/directives/v-click-outside/index'
import { store } from '@/store'

@Component({
    directives: {
        clickOutside,
    },
})
export default class AuthMobile extends Vue {
    get loggedIn() {
        return AuthModule.logged
    }

    get showBlocksShowUser() {
        return DisplayModule.blocksShow.user
    }

    toggleRegistrationPopup() {
        store.dispatch('display/toggleRegistration')
    }

    closeUserMenu() {
        store.dispatch('display/hideBlockShowUser')
    }

    logIn() {
        store.dispatch('auth/login')
    }
}
</script>
