<template>
    <ul class="drop-down">
        <li
            v-if="selectedOption.name !== undefined"
            ref="menu"
            class="dropdown-toggle btn btn-outline btn-block drop-down__arrow"
            style="height: 44px"
            @click="toggleMenu()"
        >
            {{ selectedOption.name }}
        </li>

        <li
            v-if="selectedOption.name === undefined"
            ref="menu"
            class="dropdown-toggle drop-down__arrow"
            style="height: 44px"
            @click="toggleMenu()"
        >
            {{ placeholderText }}
        </li>

        <ul
            v-if="showMenu"
            v-closable="{
                exclude: ['menu'],
                handler: 'toggleMenu',
            }"
            class="drop-down__menu"
        >
            <li v-for="option in options" :key="option.name">
                <div
                    v-if="option.name !== selectedOption.name"
                    class="drop-down-item"
                    @click="updateOption(option)"
                >
                    {{ option.name }}
                </div>
            </li>
        </ul>
    </ul>
</template>

<script lang="ts" src="./app-select.ts"></script>
<style src="./app-select.scss" lang="scss" scoped></style>
