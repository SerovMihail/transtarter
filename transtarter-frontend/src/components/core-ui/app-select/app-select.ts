import { Vue, Component, Prop } from 'vue-property-decorator'
import { closable } from '@/directives/v-click-outside-alt'
@Component({
    directives: {
        closable,
    },
})
class AppSelect extends Vue {
    @Prop([Array, Object]) readonly options!: [] | object
    @Prop([Object]) readonly selected!: { name: string }
    @Prop([String]) readonly placeholder!: string
    selectedOption = {
        name: '',
    }
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
        this.showMenu = false
        this.$emit('updateOption', this.selectedOption)
    }

    toggleMenu() {
        setTimeout(() => {
            this.showMenu = !this.showMenu
        }, 10)
    }
}
export default AppSelect
