
<template>
  <main class="content">
    <div
      class="content-wrapper container"
      v-if="loggedIn"
    >

      <aside class="aside-content">
        <ts-ui-user-sidebar ></ts-ui-user-sidebar>
        <ts-ui-personal-manager></ts-ui-personal-manager>
      </aside>

      <section class="main-content">
        <transition name="opacity">
          <router-view class="profile-page"></router-view>
        </transition>
      </section>
    </div>
    <div
      class="static"
      v-if="!loggedIn"
    >
      <slot name="static"></slot>
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { store } from '@/store/index'
import { AuthModule } from '@/store/modules/authentication.module'
import { DisplayModule } from '@/store/modules/display.module'
import UserSidebar from '@/components/user-profile/user-sidebar/user-sidebar.vue'
import PersonalManager from '@/components/user-profile/personal-manager/personal-manager.vue'
import ProfileSettings from '@/components/user-profile/profile-settings/profile-settings.vue'

@Component({
  components: {
    'ts-ui-user-sidebar': UserSidebar,
    'ts-ui-personal-manager': PersonalManager,
    'ts-ui-profile-settings': ProfileSettings
  }
})
export default class ContentSlot extends Vue {
  get loggedIn () {
    return true // AuthModule.status.loggedIn
  }
}
</script>

<style  lang="scss">
@import "./user-profile-wrapper-styles.scss";
</style>
