import { Vue, Component, Prop, Mixins, Watch } from 'vue-property-decorator'
import { ClosablePopup } from '@/components/mixins/closable-popup'
@Component({})
class appModal extends Mixins(ClosablePopup) {
    @Prop(Boolean) readonly small!: boolean
    @Prop(Boolean) readonly status!: boolean
    @Watch('status')
    private onStatusChange(status: boolean) {
        if (status) {
            this.setBlockingScroll(status)
        } else {
            this.setBlockingScroll(status)
        }
    }
    destroyed() {
        this.setBlockingScroll(false)
    }
    private setBlockingScroll(block: boolean) {
        if (block) {
            window.document.body.classList.add('modal-open')
            window.document.body.style.paddingRight = this.getScrollbarWidth() + 'px'
            window.document.body.style.backgroundColor = 'silver'
        } else {
            window.document.body.classList.remove('modal-open')
            window.document.body.style.paddingRight = null
            window.document.body.style.backgroundColor = null
        }
    }
    get size() {
        if (this.small) {
            return 'app-modal__container--small'
        } else {
            return ''
        }
    }
    private getScrollbarWidth() {
        // Creating invisible container
        const outer = document.createElement('div')
        outer.style.visibility = 'hidden'
        outer.style.overflow = 'scroll' // forcing scrollbar to appear
        outer.style.msOverflowStyle = 'scrollbar' // needed for WinJS apps
        document.body.appendChild(outer)

        // Creating inner element and placing it in the container
        const inner = document.createElement('div')
        outer.appendChild(inner)

        // Calculating difference between container's full width and the child width
        const scrollbarWidth = outer.offsetWidth - inner.offsetWidth

        // Removing temporary elements from the DOM
        outer.parentNode!.removeChild(outer)

        return scrollbarWidth
    }
    closeModal() {
        if (this.status) {
            this.$emit('statusChange', false)
        }
    }
}
export default appModal
