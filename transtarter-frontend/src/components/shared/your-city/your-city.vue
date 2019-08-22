<template>
    <div class="your-city" v-if="showYourCityBlock">
        <div class="question text-center">
            Ваш город Москва?
        </div>
        <div class="answer">
            <button class="btn" @click="closeYourCity()">Да</button>
            <button class="btn" @click="closeYourCityAndOpenSelectCity()">Сменить город</button>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { DisplayModule } from '@/store/modules/display.module'
import { store } from '@/store/index'

@Component
export default class YourCity extends Vue {
    closeYourCity() {
        store.dispatch('display/toggleYourCity')
    }

    closeYourCityAndOpenSelectCity() {
        store.dispatch('display/toggleYourCityAndOpenSelectCity')
    }

    get showYourCityBlock() {
        return DisplayModule.showBlock.yourCity
    }
    // created () {
    //   setTimeout(() => {
    //     store.dispatch('display/toggleYourCity')
    //   }, 10000)
    // }
}
</script>

<style lang="scss">
@import 'your-city-styles.scss';
</style>
