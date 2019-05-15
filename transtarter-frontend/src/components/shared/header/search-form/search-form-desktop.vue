<template>
    <form class="container search__form" @submit.prevent="goToResults">
        <search-from-select @optionWasChanged="optionWasChanged($event)"></search-from-select>
        <template v-if="loadedInput === 'Номер детали'">
            <search-by-number @searchText="searchText = $event" />
            <a class="search__btn-search" :href="`https://www.tstarter.ru/store/?noScroll=true&searchInput=${searchText}&searchType=1`">Найти</a>
        </template>
        <template v-else-if="loadedInput === 'Марка'">
            <search-by-model />
            <button type="submit" class="search__btn-search">Найти</button>
        </template>
        <template v-else-if="loadedInput === 'VIN - номер'">
            <search-by-vin @searchText="searchText = $event" />
            <button type="button" class="search__btn-search">Найти</button>
        </template>
    </form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import { HeaderSearchText } from '@/components/mixins/header-search-text.ts'
import SearchResults from '@/components/shared/header/search-results/search-results.vue'
import SearchFromSelect from '@/components/shared/header/search-form/search-form-select/search-form-select'
import SearchByModel from '@/components/shared/header/search-form/search-form-select/search-by-model/search-by-model'
import SearchByVin from '@/components/shared/header/search-form/search-form-select/search-by-vin/search-by-vin'
import SearchByNumber from '@/components/shared/header/search-form/search-form-select/search-by-number/search-by-number'
import { clickOutside } from '@/directives/v-click-outside'
import Axios from 'axios'

@Component({
  components: {
    'ts-ui-search-results': SearchResults,
    SearchFromSelect,
    SearchByModel,
    SearchByVin,
    SearchByNumber
  },
  directives: {
    clickOutside
  }
})
export default class SearchFormDesktop extends Vue {
    productSearchCriteria: any = {};
    isLoading = false;
    loadedInput = 'Номер детали';
    foundItems: any = [];
    searchText: string = '';
    optionWasChanged (option: string) {
      this.loadedInput = option
      console.log('tst')
      this.searchText = ''
    }
    get searchLink () {
      if (this.loadedInput === 'Номер детали') {
        return '/detail-number/' + this.searchText
      } else if (this.loadedInput === 'VIN - номер') {
        return '/vin-number/' + this.searchText
      }
    }
    goToResults () {
      this.$router.push({ path: this.searchLink })
    }
}
</script>
