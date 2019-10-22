import { Vue, Component, Mixins, Prop } from 'vue-property-decorator'
import { HeaderSearchText } from '@/components/mixins/header-search-text.ts'
import SearchResults from '@/components/shared/header/search-results/search-results.vue'
import vClickOutside from 'v-click-outside'
import { ProductsApiService } from '@/services/products-api.service'

Vue.use(vClickOutside)
@Component({
    components: {
        SearchResults,
    },
})
class SearchByNumber extends Mixins(HeaderSearchText) {
    private readonly productsApiService = new ProductsApiService()
    webAppUrl = process.env.VUE_APP_WEB_APP

    @Prop(String) readonly type!: string

    async goToResults() {
        try {
            const searchText = this.searchText.trim()
            const { data } = await this.productsApiService.searchByNumber(searchText, 2, 0)
            const exactMatch =
                data.length === 1 && data[0].number.toLowerCase() === searchText.toLowerCase()
            if (exactMatch) {
                const detail = data[0]
                this.goToDetailPageDirectly(detail)
            } else {
                this.goToSearchResultsPage(searchText)
            }
        } catch (err) {
            this.goToSearchResultsPage(this.searchText.trim())
        }
    }

    private goToDetailPageDirectly(detail: any) {
        if (!detail || !detail.groupId || !detail.number) {
            console.error(
                'Something went wrong on redirect to detail page directly. Detail =',
                detail
            )
            return
        }

        window.location.href = `${this.webAppUrl}/detail-number-item?crossGroupId=${
            detail.groupId
        }&number=${detail.number}`
    }

    private goToSearchResultsPage(searchText: string) {
        window.location.href = `${this.webAppUrl}/detail-number/${this.searchText}`
    }
}
export default SearchByNumber
