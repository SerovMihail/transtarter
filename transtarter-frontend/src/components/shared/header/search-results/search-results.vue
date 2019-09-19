<template>
    <transition name="opacity">
        <div style="display: none;" class="search-results">
            <div class="search-results__header">
                <div class="search-results__header-item">Описание</div>
                <div class="search-results__header-item">Номер</div>
                <div class="search-results__header-item">Производитель</div>
            </div>
            <div class="search-results__body" @click="selected">
                <a
                    :href="`${webAppUrl}/detail-number/${item.number}`"
                    v-for="(item, $index) in foundItems.slice(0, 5)"
                    :key="$index"
                    class="search-results__body-row"
                >
                    <div class="search-results__body-row-item" style="flex-basis: 33%">
                        {{ item.desc }}
                    </div>
                    <div class="search-results__body-row-item" style="flex-basis: 33%">
                        {{ item.number }}
                    </div>
                    <div class="search-results__body-row-item" style="flex-basis: 33%">
                        {{ item.manufacturer }}
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
import { Component, Vue, Prop } from 'vue-property-decorator'
import { ISearchResult } from '@/models/index'

@Component({})
export default class SearchResults extends Vue {
    webAppUrl = process.env.VUE_APP_WEB_APP

    @Prop({ default: () => [] }) readonly foundItems!: ISearchResult[]
    selected() {
        this.$emit('selected')
    }
}
</script>

<style lang="scss">
@import '../search-results.scss';
</style>
