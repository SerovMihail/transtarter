<template>
    <button
        class="cards_group__card_link"
        style="font-weight: bold;"
        @click="toggleRequestCallPopup()"
    >
        Заказать звонок
    </button>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { store } from '@/store/index'

@Component
export default class ToggleRequestCallPopup extends Vue {
    toggleRequestCallPopup() {
        store.dispatch('display/toggleRequest')
    }
}
</script>
