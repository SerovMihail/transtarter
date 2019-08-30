<template>
    <div v-if="showBlocksShowUser && loggedIn" class="menu-popup" v-click-outside="vcoConfig">
        here
        <div class="user-fullname">
            {{ userName }}
        </div>
        <!-- <div class="agreement" style="">
            Договор № 123765
        </div>
        <div class="price-info">
            Оптовые цены (активны)
        </div> -->
        <div v-if="!singleContrAgent" class="contragent">Контрагент: {{ contrAgent.name }}</div>
        <div class="wallet">
            <div class="wallet-with-icon">
                <span class="icon"></span>
                <div class="wallet-balance" :class="{ 'text-red': isOrderingDisabled }">
                    {{ partnerBalance | currencyFormatRu }}
                </div>
            </div>
        </div>

        <div v-if="restrictionMessage" class="menu-popup__restriction-message">
            <i class="el-icon-warning-outline"></i>
            {{ restrictionMessage }}
        </div>

        <div class="menu-popup_list" @click="closeUserMenu">
            <a class="menu-popup_list-item" :href="`${webAppHost}/account/settings`">
                Профиль и настройки
            </a>
            <a class="menu-popup_list-item" :href="`${webAppHost}/account/cart`">
                Корзина
                <span v-if="cartAggregateAmount" class="menu-popup_list-item-notify">
                    {{ cartAggregateAmount }}
                </span>
            </a>
            <a class="menu-popup_list-item" :href="`${webAppHost}/account/orders`">
                Заказы и оплаты
            </a>
            <a v-if="!singleContrAgent" class="menu-popup_list-item" @click="toggleContrAgent">
                Смена контрагента
            </a>
            <a class="menu-popup_list-item" @click="logout">
                Выйти
            </a>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { DisplayModule } from '@/store/modules/display.module'
import { AuthModule } from '@/store/modules/authentication.module'
import { store } from '@/store'
import { currencyFormatRu } from '@/filters'
import { closable } from '@/directives/v-click-outside-exclude'
import vClickOutside from 'v-click-outside'

Vue.filter('currencyFormatRu', currencyFormatRu)
// Vue.use(vClickOutside)
Vue.directive('vClickOutside', vClickOutside)
Vue.directive('closable', closable)
@Component
export default class AccountInfoMobile extends Vue {
    private webAppHost = process.env.VUE_APP_WEB_APP

    get contrAgent() {
        return AuthModule.contragent
    }

    get singleContrAgent() {
        return AuthModule.userContragents.length === 1
    }
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
        // @ts-ignore
        if (this.$el.offsetWidth > 0 && this.$el.offsetHeight > 0) {
            store.dispatch('display/hideBlockShowUser')
        }
    }
    toggleContrAgent() {
        store.dispatch('display/toggleContrAgentModal')
    }

    get userName() {
        return AuthModule.name
    }

    get partnerBalance() {
        return AuthModule.partnerBalance
    }

    get cartAggregateAmount() {
        return AuthModule.itemsAmount
    }

    get restrictionMessage() {
        if (this.isCreditOverflow && this.isDurationOverflow) {
            return 'Превышен срок и сумма кредита'
        } else if (this.isCreditOverflow) {
            return 'Превышена сумма кредита'
        } else if (this.isDurationOverflow) {
            return 'Превышен срок кредита'
        }
    }
    get isCreditOverflow() {
        if (AuthModule.partnerRestrictions) {
            return AuthModule.partnerRestrictions.isCreditOverflow
        }
    }
    get isDurationOverflow() {
        if (AuthModule.partnerRestrictions) {
            return AuthModule.partnerRestrictions.isDurationOverflow
        }
    }
    get isOrderingDisabled() {
        return AuthModule.isOrderingDisabled
    }
    vcoMiddleware = e => {
        debugger
        const excludeId = 'user-menu'
        const excludeIdDesktop = 'user-menu-desktop'
        const testMobile = e.target.parentElement.id === excludeId || e.target.id === excludeId
        const testDesktop =
            e.target.parentElement.id === excludeIdDesktop || e.target.id === excludeIdDesktop
        return !(testMobile || testDesktop)
    }
    vcoConfig = {
        handler: this.closeUserMenu,
        middleware: this.vcoMiddleware,
    }
}
</script>
<style lang="scss">
.menu-popup {
    &__restriction-message {
        position: relative;
        background: #f3f3f3;
        border-radius: 4px;
        padding: 6px 8px;
        font-weight: normal;
        color: $punch-approx;
        padding-right: 26px;
    }
    .el-icon-warning-outline {
        position: absolute;
        top: 7px;
        right: 4px;
        color: $punch-approx;
    }
}
</style>
