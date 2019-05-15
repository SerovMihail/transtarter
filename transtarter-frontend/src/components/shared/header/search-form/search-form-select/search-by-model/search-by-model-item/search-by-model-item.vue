<template>
    <div class="search-by-model-item" :class="{ active: isOpened, 'single-option': singleOption }">
        <div
            v-click-outside="closeDropDown"
            class="search-by-model-item__select"
            @click="toggleDropDown"
        >
            <div class="search-by-model-item__text">{{ activeOption }}</div>
        </div>
        <div v-show="isOpened" class="search-by-model-item__menu">
            <div
                v-for="option of optionsWithoutSelected"
                :key="option"
                class="search-by-model-item__menu-item"
                @click="changeActiveOption(option)"
            >
                {{ option }}
            </div>
        </div>
    </div>
</template>
<script src="./search-by-model-item.ts" lang="ts"></script>
<style src="./search-by-model-item.scss" lang="scss"></style>
