<template>
    <div class="menu-popup" v-if="showBlocksShowUser && !loggedIn">
        <ul class="menu-popup_list" v-click-outside="vcoConfig">
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
import { store } from '@/store'
import vClickOutside from 'v-click-outside'

Vue.use(vClickOutside)
@Component({})
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
        console.log('hideBlockShowUser2')
    }

    logIn() {
        store.dispatch('auth/login')
    }


    vcoMiddleware(e, el) {
        const path = e.composedPath()
        if (path[1].id === 'user-menu' || el.contains(path[0])) {
            console.log('clicked on burger or link so no handler')
            return false
        } else {
            console.log('not clicked on burger handler starts')
            console.log(path)
            return true
        }
    }
    // handlrer should toggle user menug
    vcoConfig = {
        handler: this.closeUserMenu,
        middleware: this.vcoMiddleware,
    }
}
</script>
