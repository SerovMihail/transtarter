<template>
    <div class="success-restore modal-wrapper" v-if="showSuccessPasswordRestore">
        <!-- success restore -->
        <div class=" modal-popup">
            <div class="modal-content success-restore-content">
                <div class="close" @click="toggleSuccessRestorePopup()">✖</div>
                <div class="title bold">
                    Мы отправили ссылку для восстановления на email
                </div>

                <div class="tip" style="margin-bottom: 0;">
                    Перейдите по ней и следуйте инструкциям на сайте.
                </div>
            </div>
        </div>
        <!-- end success restore -->
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import { ClosablePopup } from '@/components/mixins/closable-popup'
import { DisplayModule } from '@/store/modules/display.module'
import { store } from '@/store/index'

@Component
export default class PasswordSuccessRestore extends mixins(ClosablePopup) {
    toggleSuccessRestorePopup() {
        store.dispatch('display/toggleSuccessRestore')
    }

    get showSuccessPasswordRestore() {
        return DisplayModule.showPopup.successRestore
    }

    listenEscKeyup(e: KeyboardEvent) {
        if (e.keyCode === 27 && this.showSuccessPasswordRestore) {
            store.dispatch('display/toggleSuccessRestore')
        }
    }
}
</script>

<style scoped lang="scss">
@import 'password-success-restore';
</style>
