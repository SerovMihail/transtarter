import Vue, { VNode } from 'vue'

declare global {
    namespace JSX {
        // tslint:disable no-empty-interface
        interface Element extends VNode {}
        // tslint:disable no-empty-interface
        interface ElementClass extends Vue {}
        interface IntrinsicElements {
            [elem: string]: any
        }
    }
    interface HTMLElement {
        __vueClickOutside__?: (e: Event) => void
    }
}

declare module 'vue/types/vue' {
    export interface Vue {
        name: string
    }
}
