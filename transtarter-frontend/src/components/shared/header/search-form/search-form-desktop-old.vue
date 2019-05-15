<template>
  <form class="container search__form" @submit.prevent="onSearchClick">
    <span class="search__form__select-numbers">123</span>
    <select class="search__select" name>
      <option disabled value selected>Номер детали</option>
      <option value="detail_1">Детали 1</option>
    </select>

    <div class="search__input search-input">
      <div class="search__icon-lins"></div>
      <input
        type="text"
        class="search-input-desktop"
        ref="searchInputDesktop"
        v-model="productSearchCriteria.number"
      >
      <div class="search__clear" @click="clearSearchInput"></div>
      <ts-ui-search-results
        :found-items="foundItems"
        v-if="foundItems.length"
        class="desktop-search-result"
        v-click-outside="closeSearchResult"
      ></ts-ui-search-results>
    </div>
    <button type="submit" class="search__btn-search">Найти</button>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import { HeaderSearchText } from '@/components/mixins/header-search-text.ts';
import SearchResults from '@/components/shared/header/search-results/search-results.vue';
import { clickOutside } from '@/directives/v-click-outside';
import Axios from 'axios';

@Component({
  components: {
    'ts-ui-search-results': SearchResults
  },
  directives: {
    clickOutside
  }
})
export default class SearchFormDesktop extends mixins(HeaderSearchText) {
  private productSearchCriteria = <any>{};
  private isLoading = false;

  foundItems = <any>[];

  async onSearchClick () {
    this.isLoading = true
    await Axios.post(
      'https://new1.tstarter.ru/new/api/products/search',
      JSON.stringify({ Number: this.productSearchCriteria.number }),
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
      .then(result => {
        this.foundItems = result.data.hitsMetadata.hits.map(x => x.source)
      })
      .catch(error => {
        console.log(error)
      })
      .then(() => (this.isLoading = false))
  }
}
</script>
