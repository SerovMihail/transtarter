<template>
    <header class="header">
        <ts-ui-actualize-user></ts-ui-actualize-user>

        <!-- desktop markup -->
        <div class="desktop-header">
            <div class="desktop-header__menu">
                <div class="desktop-header__left">
                    <div class="desktop-header__logo">
                        <a href="/">Транс Стартер</a>
                    </div>
                    <ul class="desktop-header__menu-list">
                        <li class="desktop-header__menu-item">
                            <a href="/special-offers">Акции и новинки</a>
                        </li>
                        <li class="desktop-header__menu-item">
                            <a href="/delivery">Доставка и оплата</a>
                        </li>
                        <li class="desktop-header__menu-item">
                            <a href="/about-company">О компании</a>
                        </li>
                        <li class="desktop-header__menu-item">
                            <a href="/auto-workshops">Найти точку ремонта</a>
                        </li>
                        <li class="desktop-header__menu-item">
                            <a href="/contacts">Контакты</a>
                        </li>
                        <li class="desktop-header__menu-item">
                            <a href="#">Блог</a>
                        </li>
                    </ul>
                </div>

                <div class="desktop-header__right">
                    <ts-ui-user-account-desktop></ts-ui-user-account-desktop>
                </div>
            </div>

            <!-- popup for logged user -->
            <ts-ui-account-info></ts-ui-account-info>

            <div class="desktop-header__search search">
                <!-- top -->
                <ts-ui-search-form-desktop></ts-ui-search-form-desktop>

                <!-- bottom   -->
                <!-- <ts-ui-search-location-desktop></ts-ui-search-location-desktop> -->
            </div>
        </div>
        <!-- end desktop markup -->

        <!-- mobile makrup -->
        <div class="mobile-header">
            <div class="mobile-header__menu">
                <!-- left -->
                <ts-ui-mobile-menu></ts-ui-mobile-menu>

                <!-- right -->
                <ts-ui-user-account-mobile></ts-ui-user-account-mobile>
            </div>

            <!-- popups -->
            <ts-ui-mobile-links></ts-ui-mobile-links>

            <!-- <ts-ui-search-location-mobile></ts-ui-search-location-mobile> -->

            <ts-ui-auth-mobile></ts-ui-auth-mobile>

            <ts-ui-account-info></ts-ui-account-info>

            <div class="mobile-header__search">
                <ts-ui-search-form-mobile></ts-ui-search-form-mobile>
            </div>
        </div>
        <!-- end mobile makrup -->
    </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import ActualizeUser from '@/components/shared/header/actualize-user.vue'
import SearchResults from '@/components/shared/header/search-results/search-results.vue'
import AccountInfo from '@/components/shared/header/menu-popups/account-info.vue'
import MobileMenu from '@/components/shared/header/mobile-menu.vue'

import UserAccountDesktop from '@/components/shared/header/user-account/user-account-desktop.vue'
import SearchLocationDesktop from '@/components/shared/header/menu-popups/search-location-desktop.vue'
import SearchFormDesktop from '@/components/shared/header/search-form/search-form-desktop.vue'

import SearchLocationMobile from '@/components/shared/header/menu-popups/search-location-mobile.vue'
import UserAccountMobile from '@/components/shared/header/user-account/user-account-mobile.vue'
import AuthMobile from '@/components/shared/header/menu-popups/auth-mobile.vue'
import MobileLinks from '@/components/shared/header/menu-popups/mobile-links.vue'
import SearchFormMobile from '@/components/shared/header/search-form/search-form-mobile.vue'

@Component({
    components: {
        'ts-ui-user-account-desktop': UserAccountDesktop,
        'ts-ui-user-account-mobile': UserAccountMobile,
        'ts-ui-account-info': AccountInfo,
        'ts-ui-auth-mobile': AuthMobile,
        'ts-ui-mobile-menu': MobileMenu,
        'ts-ui-search-location-mobile': SearchLocationMobile,
        'ts-ui-search-location-desktop': SearchLocationDesktop,
        'ts-ui-mobile-links': MobileLinks,
        'ts-ui-search-form-mobile': SearchFormMobile,
        'ts-ui-search-form-desktop': SearchFormDesktop,
        'ts-ui-actualize-user': ActualizeUser,
    },
})
export default class Header extends Vue {}
</script>

<style lang="scss">
@import './header-styles.scss';
@import './header-mobile-styles.scss';
@import './search-form-styles.scss';
@import './search-form-mobile-styles.scss';
</style>
