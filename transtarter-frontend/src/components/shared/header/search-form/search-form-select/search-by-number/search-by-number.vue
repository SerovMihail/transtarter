<template>
    <div v-if="type !== 'mobile'" class="search__input search-input search-by-number">
        <div class="search__input search-input">
            <div class="search__icon-lins"></div>
            <input
                v-model="searchText"
                type="text"
                class="search-input-desktop"
                @keypress.enter="goToResults"
            />
            <div class="search__clear" @click="clearSearchInput()"></div>
            <search-results
                v-if="foundItems.length"
                v-click-outside="closeSearchResult"
                :found-items="foundItems"
                class="desktop-search-result"
                @selected="clearSearchInput"
            ></search-results>
        </div>
        <button class="search__btn-search" @click="goToResults()">
            Найти
        </button>
    </div>

    <div v-else class="form-row" style="position: relative;">
        <div class="search__input-mobile search-input">
            <input
                v-model="searchText"
                type="text"
                class="search-input-mobile"
                @keypress.enter="goToResults"
            />
            <div class="search__clear" @click="clearSearchInput()"></div>
        </div>
        <button @click="goToResults()" class="search__btn-search">
            <div class="search__icon-lins"></div>
        </button>
        <search-results
            v-if="foundItems.length"
            v-click-outside="closeSearchResult"
            :found-items="foundItems"
            class="mobile-search-result"
        ></search-results>
    </div>
</template>
<script src="./search-by-number.ts" lang="ts"></script>
<style src="./search-by-number.scss" lang="scss"></style>
