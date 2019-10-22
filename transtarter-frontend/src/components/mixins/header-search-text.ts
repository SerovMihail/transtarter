import { Component, Vue, Watch } from 'vue-property-decorator'
import { ISearchResult } from '@/models/index'
import axios from 'axios'

// You can declare a mixin as the same style as components.
@Component
export class HeaderSearchText extends Vue {
    private webApi = process.env.VUE_APP_WEB_APP_API
    searchText: string = ''

    foundItems: ISearchResult[] = []

    /**
     * Mock Data
     */

    private findItems() {
        const result: ISearchResult[] = []
        axios
            .post(`${this.webApi}/api/Products/search-by-number`, {
                number: this.searchText,
                skip: 0,
                take: 4,
            })
            .then(res => {
                const data = res.data.hitsMetadata.hits
                if (data.length > 0) {
                    data.forEach((el: any) => {
                        result.push({
                            id: el.id,
                            manufacturer: el.source.brand,
                            number: el.source.number,
                            desc: el.source.shortDescription,
                            alreadyInBucket: 1,
                        })
                    })
                    this.foundItems = result
                }
            })
    }

    closeSearchResult() {
        this.foundItems = []
    }

    clearSearchInput() {
        this.searchText = ''
        this.foundItems = []
    }
    idk() {
        console.log('idk')
    }

    @Watch('searchText')
    onChildChanged(val: string, oldVal: string) {
        this.$emit('searchText', this.searchText)
    }
}
