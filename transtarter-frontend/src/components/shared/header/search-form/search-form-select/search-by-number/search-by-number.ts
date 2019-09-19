import { Vue, Component, Mixins, Prop } from 'vue-property-decorator'
import { HeaderSearchText } from '@/components/mixins/header-search-text.ts'
import SearchResults from '@/components/shared/header/search-results/search-results.vue'
import vClickOutside from 'v-click-outside'

Vue.use(vClickOutside)
@Component({
    components: {
        SearchResults,
    },
})
class SearchByNumber extends Mixins(HeaderSearchText) {
    webAppUrl = process.env.VUE_APP_WEB_APP

    @Prop(String) readonly type!: string
}
export default SearchByNumber
