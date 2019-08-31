<template>
    <div class="menu-popup" v-if="showBlocksShowMenu">
        <ul class="menu-popup_list" v-click-outside="closeMainMenu">
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

    closeMainMenu() {
        store.dispatch('display/hideBlockShowMenu')
    }
}
</script>
