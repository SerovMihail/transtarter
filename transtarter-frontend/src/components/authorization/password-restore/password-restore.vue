<template>
    <div class="password-restore modal-wrapper" v-if="showPasswordRestore">
        <!-- desktop and mobile version -->
        <div class=" modal-popup">
            <div class="modal-content restore-content">
                <div class="close" @click="toggleRestorePopup()">✖</div>
                <div class="title bold">
                    Восстановление пароля
                </div>

                <div class="tip">
                    Введите email, указанный при регистрации, мы вышлем ссылку для восстановления
                    пароля
                </div>

                <div class="reset-block">
                    <form class="reset-form" @submit="restorePassword">
                        <input
                            v-model="email"
                            placeholder="Почта"
                            class="form-control reset-input"
                            type="email"
                            required
                        />
                        <button type="submit" class="btn btn-yellow reset-btn">
                            Восстановить пароль
                        </button>
                    </form>
                </div>
            </div>
        </div>
        <!-- end of desktop and mobile version -->
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import { ClosablePopup } from '@/components/mixins/closable-popup'
import { store } from '@/store/index'
import { DisplayModule } from '@/store/modules/display.module'

@Component
export default class PasswordRestore extends mixins(ClosablePopup) {
    email = ''

    restorePassword(e: Event) {
        e.preventDefault()
        store.dispatch('display/closeLogInAndOpenSuccessRegistration')
    }

    toggleRestorePopup() {
        store.dispatch('display/toggleRestore')
    }

    get showPasswordRestore() {
        return DisplayModule.showPopup.restorePassword
    }

    listenEscKeyup(e: KeyboardEvent) {
        if (e.keyCode === 27 && this.showPasswordRestore) {
            store.dispatch('display/toggleRestore')
        }
    }
}
</script>

<style scoped lang="scss">
@import 'password-restore-styles.scss';
</style>
