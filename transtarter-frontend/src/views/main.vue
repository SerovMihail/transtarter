<template>
    <div>
        <!-- main sections -->
        <layout-header></layout-header>
        <div class="container">
            <br />
            <news-block-container />
            <br />
        </div>

        <!-- <ts-map /> -->
        <!-- <div style="background-color: #0CB520; color: white; text-align: center
    margin-bottom: 10px; font-family: 'Exo 2'; font-size: 24px;
    ">
      <div style="padding: 10px; font-size: 24px;">Найдите запчасть или агрегат</div>
<ts-ui-find-detail></ts-ui-find-detail>
    </div> -->
        <layout-footer></layout-footer>
        <!-- end main sections -->

        <!-- popups -->
        <!-- <LogIn /> -->
        <request-call></request-call>
        <registration></registration>
        <password-restore></password-restore>
        <password-success-restore></password-success-restore>
        <contragent-restriction-modal></contragent-restriction-modal>
        <!-- <UnsupportedBrowser /> -->
        <!-- end popups -->

        <!-- blocks  -->
        <your-city></your-city>
        <select-city></select-city>
        <!-- end blocks  -->
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
// components
import LayoutHeader from '@/components/shared/header/header.vue'
import LayoutFooter from '@/components/shared/footer/footer.vue'
import SelectCity from '@/components/shared/select-city/select-city.vue'
import YourCity from '@/components/shared/your-city/your-city.vue'
import RegBtn from '@/components/shared/reg-btn/reg-btn.vue'
// popups
import Registration from '@/components/authorization/registration/registration.vue'
// import LogIn from '@/components/authorization/log-in/log-in.vue'
import PasswordRestore from '@/components/authorization/password-restore/password-restore.vue'
import PasswordSuccessRestore from '@/components/authorization/password-success-restore/password-success-restore.vue'
import RequestCall from '@/components/shared/request-call/request-call.vue'
// store modules
import { AuthModule } from '../store/modules/authentication.module'
import { DisplayModule } from '../store/modules/display.module'

import FindDetail from '@/components/find-detail/find-detail.vue'

import ContragentRestrictionModal from '@/components/shared/contragent-restriction-modal/contragent-restriction-modal'
import NewsBlockContainer from '@/components/news-block-container/news-block-container'

@Component({
    components: {
        LayoutHeader,
        LayoutFooter,
        YourCity,
        SelectCity,
        RegBtn,
        // popups
        Registration,
        // logIn,
        PasswordRestore,
        PasswordSuccessRestore,
        RequestCall,
        FindDetail,
        // TsMap,
        ContragentRestrictionModal,
        NewsBlockContainer,
    },
})
export default class Main extends Vue {}
</script>

<<<<<<< HEAD
<style lang="scss">
.typography {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        font-family: Exo 2;
    }
    h1 {
        font-style: normal;
        font-weight: bold;
        font-size: 72px;
        line-height: 80px;
        color: #323230;
    }
    h2 {
        font-style: normal;
        font-weight: bold;
        font-size: 40px;
        line-height: 48px;
    }
    p {
        line-height: 28px;
        font-size: 19px;
        font-family: 'PT Sans';
    }
    ol,
    ul {
        list-style-position: inside;
    }
    li {
        margin-top: 10px;
        p {
            margin-top: 4px;
        }
    }
    /* or 120% */

    color: #323230;
}
.container {
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
    @media (min-width: 576px) {
        max-width: 540px;
    }
    @media (min-width: 768px) {
        max-width: 720px;
    }
    @media (min-width: 992px) {
        max-width: 960px;
    }
    @media (min-width: 1200px) {
        max-width: 1140px;
    }
}
</style>
=======
<style lang="scss"></style>
>>>>>>> staging
