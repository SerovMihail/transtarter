<template>
    <div>
        <transition name="opacity">
            <component
                @fill-out-status="selectedComponent = $event"
                :is="selectedComponent"
            ></component>
        </transition>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import fillOutAddress from './fill-out-address/fill-out-address.vue'
import mainProfileHome from './main-profile-home/main-profile-home.vue'

@Component({
    components: {
        fillOutAddress,
        mainProfileHome,
    },
})
export default class ProfileOrders extends Vue {
    // return 'mainProfileHome'
    selectedComponent: string = 'fillOutAddress'
}
</script>

<style src="./profile-home.scss" scoped lang="scss"></style>
