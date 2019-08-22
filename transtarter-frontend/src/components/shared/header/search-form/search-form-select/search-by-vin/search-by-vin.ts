import { Vue, Component, Mixins, Prop } from 'vue-property-decorator'
import { HeaderSearchText } from '@/components/mixins/header-search-text.ts'
import { HeaderSearchByVin } from '@/components/mixins/header-search-by-vin'
import searchResultsByVin from '@/components/shared/header/search-results-by-vin/search-results-by-vin.vue'
import vClickOutside from 'v-click-outside'

Vue.use(vClickOutside)
@Component({
    components: {
        searchResultsByVin,
    },
})
class SearchByVin extends Mixins(HeaderSearchByVin) {
    @Prop(String) readonly type!: string
}
export default SearchByVin
