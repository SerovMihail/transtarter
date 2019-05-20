<template>
    <div class="menu-popup" v-if="showBlocksShowUser && loggedIn" v-click-outside="closeUserMenu">
        <div class="user-fullname">
            {{ userName }}
        </div>
        <div class="agreement" style="">
            Договор № 123765
        </div>
        <div class="price-info">
            Оптовые цены (активны)
        </div>
        <div class="wallet">
            <div class="wallet-with-icon">
                <span class="icon"></span>
                <div class="wallet-balance">
                    15 000 ₽
                </div>
            </div>
        </div>

        <ul class="menu-popup_list">
            <li class="menu-popup_list-item">
                Личный кабинет
            </li>
            <li class="menu-popup_list-item">
                Профиль и настройки
            </li>
            <li class="menu-popup_list-item menu-popup_list-item-active">
                Корзина
                <span class="menu-popup_list-item-notify">3</span>
            </li>
            <li class="menu-popup_list-item">
                Заказы и оплаты
            </li>
            <li class="menu-popup_list-item" @click="logout">
                Выйти
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { DisplayModule } from '@/store/modules/display.module'
import { AuthModule } from '@/store/modules/authentication.module'
import { store } from '@/store'
import { clickOutside } from '@/directives/v-click-outside'

@Component({
    directives: {
        clickOutside,
    },
})
export default class AccountInfoMobile extends Vue {
    get loggedIn() {
        return AuthModule.logged
    }

    get showBlocksShowMenu() {
        return DisplayModule.blocksShow.menu
    }

    get showBlocksShowUser() {
        return DisplayModule.blocksShow.user
    }

    get showBlocksShowLocation() {
        return DisplayModule.blocksShow.location
    }

    logout() {
        store.dispatch('auth/logout')
    }

    closeUserMenu() {
        store.dispatch('display/hideBlockShowUser')
    }

    get userName() {
        return AuthModule.name.length > 10
            ? AuthModule.name.substring(0, 10) + '...'
            : AuthModule.name
    }
}
</script>
