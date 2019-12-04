import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import vClickOutside from 'v-click-outside'

Vue.use(vClickOutside)
@Component({})
class AppSelect extends Vue {
    @Prop([Array, Object]) readonly options!: [] | object
    @Prop([Object]) readonly selected!: { name: string }
    @Prop([String]) readonly placeholder!: string
    @Prop(Boolean) readonly native!: boolean
    selectedOption: any = {
        name: '',
    }
    nativeSelectorValue = ''

    showMenu = false
    placeholderText = 'Please select an item'
    mounted() {
        this.selectedOption = this.selected
        if (this.placeholder) {
            this.placeholderText = this.placeholder
        }
    }

    updateOption(option: any) {
        this.selectedOption = option
        this.nativeSelectorValue = option.value
        this.showMenu = false
        this.$emit('updateOption', this.selectedOption)
    }
    @Watch('selected.name')
    onSelectedChange(val) {
        this.updateOption(this.selected)
    }

    vcoConfig = {
        handler: this.toggleMenu,
        vcoMiddleware: this.vcoMiddleware,
    }
    toggleMenu() {
        this.showMenu = !this.showMenu
    }
    vcoMiddleware(e, el) {
        debugger
        const path = e.composedPath()
    }
}
export default AppSelect
