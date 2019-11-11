<template>
    <div
        v-if="showBlocksShowUser && loggedIn"
        class="menu-popup menu-popup_right"
        v-click-outside="vcoConfig"
    >
        <div class="user-fullname">
            {{ userName }}
        </div>
        <div
            v-if="partnerProfile && partnerProfile.defaultAgentContractNumber !== null"
            class="agreement"
        >
            Договор № {{ partnerProfile.defaultAgentContractNumber }}
        </div>
        <div v-if="partnerProfile && partnerProfile.priceTypeName" class="price-info">
            Оптовые цены ({{ partnerProfile.priceTypeName }})
        </div>
        <div v-if="!singleContrAgent && contrAgent" class="contragent">
            Контрагент: {{ contrAgent.name }}
        </div>
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
            <a class="menu-popup_list-item" :href="`${webAppHost}/account/favourites`">
                Избранное

                <span v-if="favouritesAmount > 0" class="menu-popup_list-item-notify">
                    {{ favouritesAmount }}
                </span>
            </a>
            <a class="menu-popup_list-item" :href="`${webAppHost}/account/orders`">
                Заказы и оплаты
            </a>
            <a v-if="!singleContrAgent" class="menu-popup_list-item" @click="toggleContrAgent">
                Смена контрагента
            </a>
            <li class="menu-popup_list-item old-version-site">
                <a :href="oldSiteUrl">Перейти к старой версии сайта</a>
            </li>
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
import { IPartner } from '../../../../models'

Vue.filter('currencyFormatRu', currencyFormatRu)
// Vue.use(vClickOutside)
Vue.directive('vClickOutside', vClickOutside)
Vue.directive('closable', closable)
@Component
export default class AccountInfoMobile extends Vue {
    private webAppHost = process.env.VUE_APP_WEB_APP
    oldSiteUrl = process.env.VUE_APP_OLD_SITE
    vcoConfig = {
        handler: this.closeUserMenu,
        middleware: this.vcoMiddleware,
    }

    get contrAgent() {
        return AuthModule.contragent
    }

    get singleContrAgent() {
        return AuthModule.contragentIsSingle
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

    get partnerProfile(): IPartner | null {
        return AuthModule.partnerProfile
    }

    get partnerBalance() {
        if (AuthModule.partnerProfile) {
            return AuthModule.partnerProfile.balance
        }

        return undefined
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
        if (AuthModule.partnerProfile && AuthModule.partnerProfile.restrictions) {
            return AuthModule.partnerProfile.restrictions.isCreditOverflow
        }
    }
    get isDurationOverflow() {
        if (AuthModule.partnerProfile && AuthModule.partnerProfile.restrictions) {
            return AuthModule.partnerProfile.restrictions.isDurationOverflow
        }
    }
    get isOrderingDisabled() {
        return AuthModule.isOrderingDisabled
    }
    get favouritesAmount() {
        return AuthModule.favouritesAmount
    }
    vcoMiddleware(e, el) {
        const path = e.composedPath()
        if (path.some(x => x.id === 'user-menu-desktop') || el.contains(path[0])) {
            return false
        } else {
            return true
        }
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
        color: $punch-approx !important;
    }
}
</style>
