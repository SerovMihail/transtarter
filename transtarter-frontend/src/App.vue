<template>
    <div id="app">
        <!-- <router-view /> -->
        <Main />
        <contr-agent-modal />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Main from '@/views/main.vue'
import contrAgentModal from '@/components/contragent-modal/contragent-modal'

@Component({
    components: {
        Main,
        contrAgentModal,
    },
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';
</style>
