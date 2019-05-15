
<template>
  <footer class="footer">
    <div class="footer__content">

      <div class="container">

        <div class="cards_group">
          <div class="cards_group__card">
            <div class="cards_group__card_header card_header_logo">ТРАНС СТАРТЕР</div>
            <div
              class="cards_group__card_body specialization"
              style="line-height: 24px;"
            >Продажа стартеров, генераторов<br> и запчастей с 1995 г.</div>
          </div>
          <div class="cards_group__card">
            <div class="cards_group__card_body">
              <ul class="links">
                <li class="links-item"><a
                    class="cards_group__card_link"
                    href="/special-offers"
                  >Акции и новинки</a></li>
                <li class="mb-20 links-item"><a
                    class="cards_group__card_link "
                    href="/delivery"
                  >Доставка и оплата</a></li>

                <li class="links-item"><a
                    class="cards_group__card_link"
                    href="/about-company"
                  >О компании</a></li>
                <li class="links-item"><a
                    class="cards_group__card_link"
                    href="/auto-workshops"
                  >Найти точку ремонта</a></li>
                <li class="mb-20 links-item"><a
                    class="cards_group__card_link  "
                    href="/contacts"
                  >Контакты</a></li>
                <li
                  class="link-item"
                  style="padding-bottom: 0;"
                ><a
                    class="cards_group__card_link "
                    href="#"
                  >Блог</a></li>
              </ul>
            </div>
          </div>
          <div class="cards_group__card">
            <div
              class="cards_group__card_body cards_group__card_soc"
              style="line-height: 24px;"
            >
              Задавайте свои вопросы прямо сейчас

              <ul class="cards_group__card_soc-list">
                <li>
                  <a href="#!" class="social-link">
                    <span class="social-link-icon social-link-viber-icon"></span>
                  </a>
                </li>

                <li>
                  <a href="#!" class="social-link ">
                    <span class="social-link-icon social-link-telegram-icon"></span>
                  </a>
                </li>
                <li>
                  <a href="#!" class="social-link">
                    <span class="social-link-icon social-link-vk-icon"></span>
                  </a>
                </li>
                <li>
                 <a href="#!" class="social-link">
                   <span class="social-link-icon social-link-whats-up-icon"></span>
                 </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="cards_group__card call-card">
            <a
              class="cards_group__card_header"
              style="margin-bottom: 8px;"
              href="tel:+7-495-748-97-74"
            >+7 (495) 748-97-74</a>
            <div class="cards_group__card_body">
              <ts-ui-toggle-register-call-popup></ts-ui-toggle-register-call-popup>
            </div>
          </div>
        </div>

        <div class="additional-links">
          <span class="additional-links-left"><a
              class="cards_group__card_link bottom-link"
              href="/politika"
              target='_blank'
              rel='noopener noreferrer'
            >
              Политика конфиденциальности</a></span>
        </div>
      </div>

    </div>
  </footer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { store } from '@/store/index'
import ToggleRequestCallPopup from '@/components/shared/footer/toggle-register-call-popup.vue'

@Component({
  components: {
    'ts-ui-toggle-register-call-popup': ToggleRequestCallPopup
  }
})
export default class Footer extends Vue {
  toggleRequestCallPopup () {
    store.dispatch('display/toggleRequest')
  }
}
</script>

<style  lang="scss">
@import "./footer-styles.scss";
</style>
