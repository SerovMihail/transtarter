<template>
    <div v-if="type !== 'mobile'" class="search__input search-input search-by-number">
        {{ type }}
        <div class="search__icon-lins"></div>
        <input v-model="searchText" type="text" class="search-input-desktop" />
        <div class="search__clear" @click="clearSearchInput"></div>
        <search-results-by-vin
            v-if="foundItems.length"
            v-click-outside="closeSearchResult"
            :found-items="foundItems"
            class="desktop-search-result"
        ></search-results-by-vin>
    </div>

    <div v-else class="form-row" style="position: relative;">
        <div class="search__input-mobile search-input">
            <input v-model="searchText" type="text" class="search-input-mobile" />
            <div class="search__clear" @click="clearSearchInput"></div>
        </div>

        <nuxt-link tag="button" :to="'/vin-number/' + searchText" class="search__btn-search">
            <div class="search__icon-lins"></div>
        </nuxt-link>

        <search-results-by-vin
            v-if="foundItems.length"
            v-click-outside="closeSearchResult"
            :found-items="foundItems"
            class="mobile-search-result"
        ></search-results-by-vin>
    </div>
</template>
<script src="./search-by-vin.ts" lang="ts"></script>
<style src="./search-by-vin.scss" lang="scss"></style>
