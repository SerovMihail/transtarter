import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
// import { clickOutside } from '@/directives/v-click-outside/index'
import { closable } from '@/directives/v-click-outside-alt'

interface ISearchFromSelect {
    isOpen: Boolean;
    selectedOption: string;
    options: any[];
}
@Component({
  directives: {
    closable
  }
})
class SearchFormSelect extends Vue implements ISearchFromSelect {
  get icon () {
    switch (this.selectedOption) {
      case 'Номер детали':
        return '123'
      case 'VIN - номер':
        return 'VIN'
    }
  }
  get optionsWithoutSelected () {
    return this.options.filter(option => option !== this.selectedOption)
  }
  changeOption (option: string) {
    this.selectedOption = option
    this.$emit('optionWasChanged', option)
  }
  closeUserMenu () {
    this.isOpen = false
  }
  switchOpened () {
    this.isOpen = !this.isOpen
  }
    isOpen = false;
    someProperty = '1'
    selectedOption = 'Номер детали';
    options = ['Номер детали', 'VIN - номер', 'Марка'];
}
export default SearchFormSelect
