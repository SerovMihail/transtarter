<template>
    <div v-if="!loggedIn" class="register-block">
        <div>
            <p class="register-block__special-price">
                Специальная цена доступна только для оптовых клиентов.
            </p>
            <p class="register-block__reg-to-get-sale">
                Зарегистрируйтесь, чтобы покупать запчасти со скидкой
            </p>
        </div>
        <button class="btn btn-yellow btn-reg" @click="toggleRegistrationPopup">
            Зарегистрироваться
        </button>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { store } from '@/store/index'
import { AuthModule } from '@/store/modules/authentication.module'

@Component
export default class RegBtn extends Vue {
    get loggedIn() {
        return AuthModule.logged
    }

    toggleRegistrationPopup() {
        store.dispatch('display/toggleRegistration')
    }
}
</script>

<style lang="scss">
.register-block {
    &__special-price,
    &__reg-to-get-sale {
        font-size: 20px !important;
        line-height: 28px !important;
    }
    &__reg-to-get-sale {
        font-weight: bold;
        margin-bottom: 22px;
    }
}

.btn-reg {
    width: 352px;
    height: 72px;
    @media (max-width: 768px) {
        width: 100%;
        height: 40px;
    }
}
</style>
