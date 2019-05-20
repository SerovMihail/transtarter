<template>
    <div>
        <!-- main sections -->
        <layout-header></layout-header>

        <!-- <div style="background-color: #0CB520; color: white; text-align: center
    margin-bottom: 10px; font-family: 'Exo 2'; font-size: 24px;
    ">
      <div style="padding: 10px; font-size: 24px;">Найдите запчасть или агрегат</div>
<ts-ui-find-detail></ts-ui-find-detail>
    </div> -->
        <user-profile-wrapper></user-profile-wrapper>
        <layout-footer></layout-footer>
        <!-- end main sections -->

        <!-- popups -->
        <!-- <LogIn /> -->
        <request-call></request-call>
        <registration></registration>
        <password-restore></password-restore>
        <password-success-restore></password-success-restore>
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
import UserProfileWrapper from '@/components/user-profile/user-profile-wrapper/user-profile-wrapper.vue'
import SelectCity from '@/components/shared/select-city/select-city.vue'
import YourCity from '@/components/shared/your-city/your-city.vue'
// import UserSidebar from '@/components/user-profile/user-sidebar/user-sidebar.vue'
// import PersonalManager from '@/components/user-profile/personal-manager/personal-manager.vue'
// import ProfileSettings from '@/components/user-profile/profile-settings/profile-settings.vue'
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

@Component({
    components: {
        LayoutHeader,
        LayoutFooter,
        UserProfileWrapper,
        // userSidebar,
        // personalManager,
        // profileSettings,
        YourCity,
        SelectCity,
        // popups
        Registration,
        // logIn,
        PasswordRestore,
        PasswordSuccessRestore,
        RequestCall,
        FindDetail,
    },
})
export default class Main extends Vue {}
</script>

<style scoped lang="scss"></style>
