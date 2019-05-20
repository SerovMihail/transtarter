<template>
    <span style="display:none;"></span>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { store } from '@/store/index'

@Component
export default class ActualizeUser extends Vue {
    mounted() {
        store.dispatch('auth/actualizeUser')
    }
}
</script>
