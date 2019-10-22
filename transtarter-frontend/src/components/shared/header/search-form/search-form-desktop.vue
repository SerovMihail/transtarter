<template>
    <div class="container search__form">
        <search-from-select @optionWasChanged="optionWasChanged($event)"></search-from-select>
        <template v-if="loadedInput === 'Номер детали'">
            <search-by-number @searchText="searchText = $event" />
        </template>
        <template v-else-if="loadedInput === 'Марка'">
            <search-by-model />
            <button type="submit" class="search__btn-search">Найти</button>
        </template>
        <template v-else-if="loadedInput === 'VIN - номер'">
            <search-by-vin @searchText="searchText = $event" />
            <button type="button" class="search__btn-search">Найти</button>
        </template>
    </div>
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
import Axios from 'axios'

@Component({
    components: {
        'ts-ui-search-results': SearchResults,
        SearchFromSelect,
        SearchByModel,
        SearchByVin,
        SearchByNumber,
    },
})
export default class SearchFormDesktop extends Vue {
    searchBaseUrl: string = process.env.VUE_APP_WEB_APP
    productSearchCriteria: any = {}
    isLoading = false
    loadedInput = 'Номер детали'
    foundItems: any = []
    searchText: string = ''
    optionWasChanged(option: string) {
        this.loadedInput = option
        this.searchText = ''
    }
}
</script>
