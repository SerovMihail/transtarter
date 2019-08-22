<template>
    <button
        v-bind="$attrs"
        :class="[variantType, { 'btn-block': block }]"
        type="button"
        class="btn btn-square"
        v-on="$listeners"
    >
        <component :is="icon" class="btn-icon"></component>
        <slot />
    </button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component({})
class AppBtn extends Vue {
    @Prop(String) readonly icon!: string
    @Prop(String) readonly variant!: string
    @Prop(Boolean) readonly block!: boolean
    get variantType() {
        if (this.variant === 'shadow') {
            return 'btn-shadow'
        } else if (this.variant === 'small-icon') {
            return ['btn-sm-icon', 'btn-outline']
        } else {
            return 'btn-outline'
        }
    }
}
export default AppBtn
</script>

<style lang="scss">
.btn-icon {
    margin-right: 8px;
}
</style>
