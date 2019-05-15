<template>
        <div
            v-closable="{
                exclude: [],
                handler: 'closeUserMenu',
                componentName: 'ts-ui-header',
            }"
            class="search-form-select"
            :class="{ active: isOpen }"
        >
            <!-- add click event to div above -->
            <!-- @click="switchOpened" -->
            <!-- uncoment search-form-select__text:after -->

            <div class="search-form-select__selected">
                <div class="search-form-select__icon">
                    {{ icon }}
                    <svg
                        v-if="selectedOption === 'Марка'"
                        width="18"
                        height="16"
                        viewBox="0 0 18 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M15.1693 9.15732C14.4743 9.1593 13.9151 8.58348 13.9115 7.87572C13.9151 7.16292 14.4743 6.58674 15.1693 6.59268C15.8524 6.58674 16.4108 7.16292 16.4153 7.87572C16.4108 8.58348 15.8524 9.15912 15.1693 9.15732ZM9 5.12946H8.98794H3.15738L4.27014 2.12922C4.40442 1.70334 4.61286 1.3986 5.10498 1.39122H8.98794H9H12.895C13.3799 1.3986 13.5889 1.70316 13.7297 2.12922L14.8426 5.12946H9ZM2.83086 9.15732C2.14074 9.1593 1.58202 8.58348 1.5849 7.87572C1.58202 7.16292 2.14074 6.58674 2.83086 6.59268C3.51864 6.58674 4.07736 7.16292 4.07664 7.87572C4.07736 8.58348 3.51846 9.15912 2.83086 9.15732ZM16.3663 5.16528L14.8909 1.35522C14.6151 0.62586 14.0119 0.00522 12.8707 0H10.7901H7.23384H5.11668C3.98088 0.00522 3.37788 0.62586 3.0969 1.35522L1.6209 5.16528C1.03518 5.24088 -0.00179766 5.92938 2.34025e-06 7.23366V12.0848H1.43982V13.6334C1.43622 15.5425 4.13766 15.5198 4.13694 13.6334V12.0848H9H13.8506V13.6334C13.8566 15.5198 16.5582 15.5425 16.56 13.6334V12.0848H18V7.23366C17.9953 5.92938 16.9578 5.24088 16.3663 5.16528Z"
                            fill="white"
                        />
                    </svg>
                </div>
                <div class="search-form-select__text">{{ selectedOption }}</div>
            </div>
            <div v-show="isOpen" class="search-form-select__menu">
                <div
                    v-for="option of optionsWithoutSelected"
                    :key="option"
                    class="search-form-select__item"
                    @click="changeOption(option)"
                >
                    {{ option }}
                </div>
            </div>
        </div>
</template>
<style src="./search-form-select.scss" lang="scss"></style>
<script src="./search-form-select.ts" lang="ts"></script>
