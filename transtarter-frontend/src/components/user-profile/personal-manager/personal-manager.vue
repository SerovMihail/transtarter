<template>
  <div class="personal-manager">
    <div class="personal-manager-top">
      <div class="question-sign"></div>

      <div class="have-questions">
        По любым вопросам обращайтесь к вашему личному менеджеру
      </div>

    </div>
    <div class="personal-manager-bottom">
      <div class="manager-picture"></div>
      <div class="manager-fullname">
        Иван Петров
      </div>
      <a
        class="manager-phone"
        href="tel:7-900-111-11-11"
      >
        + 7 (900) 111-11-11
      </a>
      <a
        class="manager-email border-green"
        href="mailto:i.petrov@tstarter.ru"
      >
        i.petrov@tstarter.ru
      </a>
      <button
        class="ask-question"
        @click="toggleRequestCallPopup()"
      >
        Задать вопрос
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { DisplayModule } from '@/store/modules/display.module'
import { store } from '@/store/index'

@Component
export default class PersonalManager extends Vue {
  toggleRequestCallPopup () {
    store.dispatch('display/toggleRequest')
  }
}
</script>

<style  lang="scss">
@import "./personal-manager-styles.scss";
</style>
