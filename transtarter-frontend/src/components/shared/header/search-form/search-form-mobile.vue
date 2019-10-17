<template>
    <div class="search__form">
        <div class="form-row">
            <search-form-select
                class="search-from-mobile"
                @optionWasChanged="loadedInput = $event"
            ></search-form-select>
        </div>
        <template v-if="loadedInput === 'Номер детали'">
            <search-by-number type="mobile" @searchText="searchText = $event" />
        </template>
        <template v-else-if="loadedInput === 'Марка'">
            <search-by-model class="search-from-mobile" />
        </template>
        <template v-else-if="loadedInput === 'VIN - номер'">
            <search-by-vin type="mobile" />
        </template>
    </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { HeaderSearchText } from '@/components/mixins/header-search-text'
import { mixins } from 'vue-class-component'
import SearchResults from '@/components/shared/header/search-results/search-results.vue'
import SearchFormSelect from '@/components/shared/header/search-form/search-form-select/search-form-select'
import SearchByModel from '@/components/shared/header/search-form/search-form-select/search-by-model/search-by-model'
import SearchByVin from '@/components/shared/header/search-form/search-form-select/search-by-vin/search-by-vin'
import SearchByNumber from '@/components/shared/header/search-form/search-form-select/search-by-number/search-by-number'

@Component({
    components: {
        'ts-ui-search-results': SearchResults,
        SearchFormSelect,
        SearchByModel,
        SearchByVin,
        SearchByNumber,
    },
})
export default class SearchFormMobile extends mixins(HeaderSearchText) {
    loadedInput = 'Номер детали'
}
</script>
