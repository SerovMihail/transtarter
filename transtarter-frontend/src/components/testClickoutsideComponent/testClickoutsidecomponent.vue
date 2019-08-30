<template>
    <div>
        <div v-click-outside="vcoConfig" class="clickOutsideArea"></div>
        <div class="other-div">other div</div>
    </div>
</template>
<style lang="scss">
.clickOutsideArea {
    width: 200px;
    height: 200px;
    background-color: black;
    border: 1px dashed magenta;
}
.other-div {
    padding: 20px;
    background: black;
    color: white;
}
</style>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import vClickOutside from 'v-click-outside'
Vue.use(vClickOutside)
@Component
export default class TestClickoutsidecomponent extends Vue {
    test = 'test'
    middleware = (e, el) => {
        const excludeId = 'user-menu'
        return e.target.parentElement.id === excludeId || e.target.id === excludeId
    }
    handler() {
        alert('hooray')
    }
    vcoConfig = {
        handler: this.handler,
        middleware: this.middleware,
        events: ['dblclick', 'click'],
    }
}
</script>
