<template>
    <footer class="footer">
        <div class="footer__content">
            <div class="container">
                <div class="cards_group">
                    <div class="cards_group__card">
                        <div class="cards_group__card_header card_header_logo">ТРАНС СТАРТЕР</div>
                        <div class="cards_group__card_body specialization">
                            Продажа стартеров, генераторов
                            <br />
                            и запчастей с 1995 г.
                        </div>
                    </div>
                    <div class="cards_group__card">
                        <div class="cards_group__card_body">
                            <ul class="links">
                                <li class="links-item">
                                    <a class="cards_group__card_link" href="/special-offers">
                                        Акции и новинки
                                    </a>
                                </li>
                                <li class="mb-20 links-item">
                                    <a class="cards_group__card_link " href="/delivery">
                                        Доставка и оплата
                                    </a>
                                </li>

                                <li class="links-item">
                                    <a class="cards_group__card_link" href="/about-company">
                                        О компании
                                    </a>
                                </li>
                                <li class="links-item">
                                    <a class="cards_group__card_link" href="/auto-workshops">
                                        Найти точку ремонта
                                    </a>
                                </li>
                                <li class="mb-20 links-item">
                                    <a class="cards_group__card_link  " href="/contacts">
                                        Контакты
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="cards_group__card">
                        <div class="cards_group__card_body cards_group__card_soc">
                            <div>
                                Задавайте свои вопросы
                                <br />
                                прямо сейчас
                            </div>

                            <ul class="cards_group__card_soc-list">
                                <li>
                                    <a
                                        href="https://vk.com/transstarter777"
                                        target="_blank"
                                        class="social-link"
                                    >
                                        <span class="social-link-icon social-link-vk-icon"></span>
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href="https://www.facebook.com/tstarter/"
                                        class="social-link"
                                        target="_blank"
                                    >
                                        <span
                                            class="social-link-icon social-link-facebook-icon"
                                        ></span>
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href="https://www.instagram.com/transstarter/"
                                        class="social-link"
                                        target="_blank"
                                    >
                                        <span
                                            class="social-link-icon social-link-instagram-icon"
                                        ></span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="cards_group__card call-card">
                        <a class="cards_group__card_header" href="tel:+7-495-748-97-74">
                            +7 (495) 748-97-74
                        </a>
                        <div>
                            старая версия сайта:
                            <br />
                            <a
                                class="cards_group__card_header"
                                style="margin-bottom: 8px;"
                                :href="oldSiteUrl"
                            >
                                {{ oldSiteName }}
                            </a>
                        </div>
                    </div>
                </div>

                <div class="additional-links">
                    <span class="additional-links-left">
                        <a
                            class="cards_group__card_link bottom-link"
                            href="/policy"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Политика конфиденциальности
                        </a>
                    </span>
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
        'ts-ui-toggle-register-call-popup': ToggleRequestCallPopup,
    },
})
export default class Footer extends Vue {
    oldSiteUrl = process.env.VUE_APP_OLD_SITE
    oldSiteName = process.env.VUE_APP_OLD_SITE!.replace(/https?:\/\//, '')
    toggleRequestCallPopup() {
        store.dispatch('display/toggleRequest')
    }
}
</script>

<style lang="scss">
@import './footer-styles.scss';
</style>
