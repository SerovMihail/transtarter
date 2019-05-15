import { Component, Vue, Watch } from 'vue-property-decorator'
import { ISearchResult } from '@/models/index'
import axios from 'axios'

// You can declare a mixin as the same style as components.
@Component
export class HeaderSearchText extends Vue {
    searchText: string | number = '';

    foundItems: ISearchResult[] = [];

    /**
     * Mock Data
     */

    private findItems () {
      const result: ISearchResult[] = []
      axios
        .post(`https://new1.tstarter.ru/new/api/Products/search-by-number`, {
          number: this.searchText,
          skip: 0,
          take: 4
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
                alreadyInBucket: 1
              })
            })
            this.foundItems = result
          }
        })
    }
    // mock data
    // potentialFoundItems2: ISearchResult[] = [
    //     {
    //         id: 1,
    //         desc: "Стартер",
    //         number: "45888701",
    //         manufacturer: "CITROEN",
    //         alreadyInBucket: 0,
    //     },
    //     {
    //         id: 2,
    //         desc: "Генератор",
    //         number: "95493099",
    //         manufacturer: "CITROEN",
    //         alreadyInBucket: 2,
    //     },
    //     {
    //         id: 3,
    //         desc: "Бендикс",
    //         number: "WA54-9309",
    //         manufacturer: "WAI",
    //         alreadyInBucket: 0,
    //     },
    //     {
    //         id: 4,
    //         desc: "Бендикс",
    //         number: "WA54-9309-1",
    //         manufacturer: "WAI",
    //         alreadyInBucket: 0,
    //     },
    // ];

    closeSearchResult () {
      this.foundItems = []
    }

    clearSearchInput () {
      this.searchText = ''
      this.foundItems = []
    }
    idk () {
      console.log('idk')
    }

    @Watch('searchText')
    onChildChanged (val: string, oldVal: string) {
      if (val.length >= 3) {
        this.findItems()
      } else if (val.length <= 3 && oldVal.length >= 3) {
        this.foundItems = []
      }
      this.$emit('searchText', this.searchText)
    }
}
