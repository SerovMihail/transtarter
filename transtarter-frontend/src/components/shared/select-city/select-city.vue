<template>
    <div class="select-city" v-if="showSelectCity">
        <div class="tip">Выберите ваш город</div>
        <ul class="cities">
            <li class="city" v-for="(city, index) in cities" :key="index" @click="selectCity(city)">
                {{ city }}
            </li>
        </ul>
        <div class="city-select-tip">Если вашего города нет в списке, выбирайте ближайший</div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { DisplayModule } from '@/store/modules/display.module'
import { store } from '@/store/index'

@Component
export default class SelectCity extends Vue {
    cities = [
        'Москва',
        'Калининград',
        'Екатеринбург',
        'Санкт-Петербург',
        'Пермь',
        'Киров',
        'Киев',
        'Алматы',
    ]

    selectCity(cityName: string) {
        store.dispatch('display/toggleSelectCity')
    }

    get showSelectCity() {
        return DisplayModule.showBlock.selectCity
    }
}
</script>

<style lang="scss" scoped>
@import 'select-city-styles.scss';
</style>
