<template>
    <div>
        Происходит редирект на Transtarter Identity Server
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { store } from '@/store/index'
import CookieStorage from 'cookie-storage-domain'

@Component
export default class LogInRedirect extends Vue {
    mounted() {
        CookieStorage.setItem('shop-redirect', JSON.stringify(true))
        store.dispatch('auth/login')
    }
}
</script>
