<template>
    <div v-if="!loggedIn">
        <div>
            <p class="special-price">
                Специальная цена доступна только для оптовых клиентов.
            </p>
            <p class="reg-to-get-sale">
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
.btn-reg {
    width: 352px;
    height: 72px;
}

@media (max-width: 768px) {
    .btn-reg {
        width: 100%;
        height: 40px;
    }
}

.news-and-sales .bg-image .overflow-text .special-price,
.news-and-sales .bg-image .overflow-text .reg-to-get-sale {
    font-size: 16px !important;
    line-height: 24px !important;
}
</style>
