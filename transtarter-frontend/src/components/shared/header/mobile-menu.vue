<template>
    <div class="mobile-header__menu__left">
        <div class="burger-wrapper">
            <span class="burger-icon" @click="toggleMainMenu()"></span>
        </div>
        <div class="logo">
            <a href="/">
                Транс
                <br />
                Стартер
            </a>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { store } from '@/store/index'

@Component
export default class MobileMenu extends Vue {
    toggleMainMenu() {
        setTimeout(() => {
            store.dispatch('display/toggleBlockShowMenu')
        })
    }
}
</script>
