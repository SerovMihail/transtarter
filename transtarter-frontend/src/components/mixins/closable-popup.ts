import Vue from 'vue'
import Component from 'vue-class-component'

// You can declare a mixin as the same style as components.
@Component
export class ClosablePopup extends Vue {
    // this method fill be replaced
    listenEscKeyup(e: KeyboardEvent) {}

    mounted() {
        window.addEventListener('keyup', this.listenEscKeyup)
    }

    beforeDestroy() {
        window.removeEventListener('keyup', this.listenEscKeyup)
    }
}
