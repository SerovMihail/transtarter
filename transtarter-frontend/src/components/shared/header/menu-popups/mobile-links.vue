<template>
    <div class="menu-popup" v-if="showBlocksShowMenu" v-click-outside="vcoConfig">
        <ul class="menu-popup_list">
            <li>
                <a class="menu-popup_list-item" href="/special-offers">Акции и новинки</a>
            </li>
            <li>
                <a class="menu-popup_list-item" href="/delivery">Доставка и оплата</a>
            </li>
            <li>
                <a href="/about-company" class="menu-popup_list-item active">О компании</a>
            </li>
            <li>
                <a class="menu-popup_list-item" href="/auto-workshops">Найти точку ремонта</a>
            </li>
            <li>
                <a class="menu-popup_list-item" href="/contacts">Контакты</a>
            </li>
            <!-- <li class="menu-popup_list-item">
                <a href="#">Блог</a>
            </li> -->
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { DisplayModule } from '@/store/modules/display.module'
import { store } from '@/store/index'
import { mixins } from 'vue-class-component'
import { HeaderSearchText } from '@/components/mixins/header-search-text'
import vClickOutside from 'v-click-outside'

Vue.use(vClickOutside)
@Component({})
export default class MobileLinks extends mixins(HeaderSearchText) {
    get showBlocksShowMenu() {
        return DisplayModule.blocksShow.menu
    }
    vcoMiddleware(e) {
        const path = e.composedPath()
        if (path[0].id === 'burger-menu' || path[0].className.includes('menu-popup_list-item')) {
            console.log('clicked on burger or link so no handler')
            return false
        } else {
            console.log('not clicked on burger handler starts')
            console.log(path)
            return true
        }
    }
    closeMainMenu() {
        store.dispatch('display/hideBlockShowMenu')
    }
    vcoConfig = {
        handler: this.closeMainMenu,
        middleware: this.vcoMiddleware,
    }
}
</script>
