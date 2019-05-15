<template>
  <div>
    <div class="page-container">
    <div class="title">
      Профиль и настройки
    </div>

    <div
      class="btn-group btn-group-column"
      role="group"
      aria-label="Basic example"
    >
      <button type="button" @click="activateTab(tabs.regData)" :class="{ active: regDataIsActive }">Регистрационные данные</button>
      <button type="button" @click="activateTab(tabs.shippingAddresses)" :class="{ active: shippingAddressesIsActive }">Адреса доставки</button>
      <button type="button" @click="activateTab(tabs.requisites)" :class="{ active: requisitesIsActive }">Реквизиты и юр. лица</button>
    </div>

    <ts-ui-registration-data-tab v-if="regDataIsActive"></ts-ui-registration-data-tab>
    <ts-ui-shipping-addresses-tab v-if="shippingAddressesIsActive"></ts-ui-shipping-addresses-tab>
    <ts-ui-requisites-tab v-if="requisitesIsActive"></ts-ui-requisites-tab>
  </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import RegistrationDataTab from './registration-data-tab/registration-data-tab.vue'
import ShippingAddressesTab from './shipping-addresses-tab/shipping-addresses-tab.vue'
import RequisitesTab from './requisites-tab/requisites-tab.vue'

@Component({
  components: {
    'ts-ui-registration-data-tab': RegistrationDataTab,
    'ts-ui-shipping-addresses-tab': ShippingAddressesTab,
    'ts-ui-requisites-tab': RequisitesTab
  }
})
export default class ProfileSettings extends Vue {
  tabs = {
    regData: 'regData',
    shippingAddresses: 'shippingAddresses',
    requisites: 'requisites'
  }

  currentActiveTab = this.tabs.regData

  activateTab (newActiveTab: string) {
    this.currentActiveTab = newActiveTab
  }

  get regDataIsActive (): boolean {
    return this.currentActiveTab === this.tabs.regData
  }

  get shippingAddressesIsActive (): boolean {
    return this.currentActiveTab === this.tabs.shippingAddresses
  }
  get requisitesIsActive (): boolean {
    return this.currentActiveTab === this.tabs.requisites
  }
}
</script>

<style  lang="scss">
@import "./profile-settings-styles.scss";
</style>
