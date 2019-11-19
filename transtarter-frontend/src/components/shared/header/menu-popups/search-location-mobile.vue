<template>
    <div class="menu-popup menu-popup_left" v-if="showBlocksShowLocation">
        <div class="container search__location">
            <div class="search__location-left">
                <div class="search__city border-white link">
                    Москва
                </div>

                <ul class="search__street-list">
                    <li class="search__street">
                        <div class="search__icon-marker"></div>
                        <p>Каширское шоссе, 41</p>
                    </li>
                    <li class="search__street">
                        <div class="search__icon-marker"></div>
                        <p>г. Дзержинский, ул. Энергетиков, 18А</p>
                    </li>
                </ul>
            </div>

            <div class="search__location-right">
                <a class="search__phone border-white" href="tel:+7-495-748-97-74">
                    +7 (495) 748-97-74
                </a>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import { HeaderSearchText } from '@/components/mixins/header-search-text'
import { DisplayModule } from '@/store/modules/display.module'

@Component
export default class SearchLocation extends Vue {
    get showBlocksShowLocation() {
        return DisplayModule.blocksShow.location
    }
}
</script>
