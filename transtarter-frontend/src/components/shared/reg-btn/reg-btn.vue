<template>
    <button class="btn btn-yellow btn-reg" @click="toggleRegistrationPopup">
        Зарегистрироваться
    </button>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { store } from '@/store/index'

@Component
export default class RegBtn extends Vue {
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
</style>
