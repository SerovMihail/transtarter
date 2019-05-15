<template>
    <div class="search-by-model">
        <search-by-model-item
            type="brand"
            :cars="cars"
            @ActiveOptionChanged="Object.assign(selectedOptions, $event)"
        />
        <search-by-model-item
            :models="cars[selectedOptions.brand]"
            type="model"
            @ActiveOptionChanged="Object.assign(selectedOptions, $event)"
        />
        <search-by-model-item
            type="year"
            :years="cars[selectedOptions.brand][selectedOptions.model].years"
            @ActiveOptionChanged="Object.assign(selectedOptions, $event)"
        />
        <search-by-model-item
            type="liters"
            :liters="
                cars[selectedOptions.brand][selectedOptions.model].years[selectedOptions.year]
                    .liters
            "
            @ActiveOptionChanged="Object.assign(selectedOptions, $event)"
        />
        <search-by-model-item
            type="fuel"
            :fuels="
                cars[selectedOptions.brand][selectedOptions.model].years[selectedOptions.year]
                    .liters[selectedOptions.liters].fuel
            "
            @ActiveOptionChanged="Object.assign(selectedOptions, $event)"
        />
    </div>
</template>
<script src="./search-by-model.ts" lang="ts"></script>

<style src="./search-by-model.scss" lang="scss"></style>
