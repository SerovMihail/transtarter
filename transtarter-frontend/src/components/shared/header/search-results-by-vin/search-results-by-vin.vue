<template>
    <transition name="opacity">
        <div class="search-results">
            <div class="search-results__header">
                <div class="search-results__header-item search-results__manufacturer">Марка</div>
                <div class="search-results__header-item search-results__model">Модель</div>
                <div class="search-results__header-item search-results__engine">Двигатель</div>
                <div class="search-results__header-item search-results__year">Год выпуска</div>
                <div class="search-results__header-item search-results__transmission">
                    Трансмисия
                </div>
            </div>
            <div class="search-results__body">
                <a
                    v-for="(item, $index) in foundItems.slice(0, 5)"
                    :key="$index"
                    class="search-results__body-row"
                    :href="'/search-matches/' + item.id"
                    :to="{ name: 'search-matches', id: item.id }"
                >
                    <div class="search-results__body-row-item search-results__manufacturer">
                        {{ item.manufacturer }}
                    </div>
                    <div class="search-results__body-row-item search-results__model">
                        {{ item.model }}
                    </div>
                    <div class="search-results__body-row-item search-results__engine">
                        {{ item.engine }}
                    </div>
                    <div class="search-results__body-row-item search-results__year">
                        {{ item.dateOfManufacture }}
                    </div>
                    <div
                        class="search-results__body-row-item search-results__year search-results__transmission"
                    >
                        {{ item.transmission }}
                    </div>
                    <div v-if="item.alreadyInCart" class="search-results__body-row-item-optional">
                        <div class="already-in-bucket">
                            <div class="shopping-bucket-icon"></div>
                            <div class="items-in-bucket">{{ item.alreadyInCart }} шт.</div>
                        </div>
                    </div>

                    <div v-if="item.alreadyInBucket" class="search-results__body-row-item-optional">
                        <div class="already-in-bucket">
                            <div class="shopping-bucket-icon"></div>
                            <div class="items-in-bucket">{{ item.alreadyInBucket }} шт.</div>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { clickOutside } from "@/directives/v-click-outside/index";
import { ISearchResult } from "@/models/index";

@Component({
    directives: {
        clickOutside,
    },
})
export default class SearchResultsByVin extends Vue {
    @Prop({ default: () => [] }) readonly foundItems!: ISearchResult[];
}
</script>

<style scoped lang="scss">
@import "../search-results.scss";
</style>
