<template>
    <div class="log-in modal-wrapper" v-if="modalIsOpened">
        <!-- desktop and mobile version -->
        <div class="modal-popup">
            <div class="modal-content log-in-content ">
                <div class="close" @click="toggleLogInPopup()">✖</div>
                <div class="title bold">
                    Вход на сайт
                </div>

                <form class="log-in-form" @submit.prevent="login">
                    <button type="submit" class="btn btn-yellow btn-log-in">
                        <!-- Войти -->
                        Войти через IdentityServer
                    </button>
                </form>

                <div class="want-to-reg">
                    Впервые на сайте?
                    <a class="go-to-reg" @click="closeLogInAndOpenRestration()">
                        Зарегистрироваться
                    </a>
                </div>
            </div>
        </div>
        <!-- end of desktop  and mobile  version -->
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import { ClosablePopup } from '@/components/mixins/closable-popup'
import { DisplayModule } from '@/store/modules/display.module'
import { store } from '@/store/index'

@Component
export default class LogIn extends mixins(ClosablePopup) {
    logInForm = {
        email: '',
        password: '',
    }

    foreignPc = false

    toggleForeignPc() {
        this.foreignPc = !this.foreignPc
    }

    toggleLogInPopup() {
        store.dispatch('display/toggleLogIn')
    }

    closeLogInAndOpenRestration() {
        store.dispatch('display/closeLogInAndOpenRegistration')
    }

    closeLogInAndOpenRestorePassword() {
        store.dispatch('display/closeLogInAndOpenRestore')
    }

    get modalIsOpened() {
        return false // DisplayModule.showPopup.logIn
    }

    login(e: Event) {
        // module is injected in header
        store.dispatch('auth/login')
        store.dispatch('display/toggleLogIn')
    }

    listenEscKeyup(e: KeyboardEvent) {
        if (e.keyCode === 27 && this.modalIsOpened) {
            store.dispatch('display/toggleLogIn')
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import 'log-in-styles.scss';
</style>
