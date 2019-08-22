<template>
    <div
        v-if="showBlocksShowUser && loggedIn"
        class="menu-popup"
        v-closable="{ handler: 'closeUserMenu', excludeIds: ['user-menu', 'user-menu-desktop'] }"
    >
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

        <ul class="menu-popup_list" @click="closeUserMenu">
            <li class="menu-popup_list-item">
                <a :href="`${webAppHost}/account/settings`">Профиль и настройки</a>
            </li>
            <li class="menu-popup_list-item">
                <a :href="`${webAppHost}/account/cart`">Корзина</a>
                <span v-if="cartAggregateAmount" class="menu-popup_list-item-notify">
                    {{ cartAggregateAmount }}
                </span>
            </li>
            <li class="menu-popup_list-item">
                <a :href="`${webAppHost}/account/orders`">Заказы и оплаты</a>
            </li>

            <li v-if="!singleContrAgent" class="menu-popup_list-item" @click="toggleContrAgent">
                Смена контрагента
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

@Component({})
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
}
</script>
<style lang="scss" scoped>
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
