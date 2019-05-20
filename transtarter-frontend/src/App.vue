<template>
    <div id="app">
        <!-- <router-view /> -->
        <Main />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Main from '@/views/main.vue'

@Component({
    components: {
        Main,
    },
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';
</style>
