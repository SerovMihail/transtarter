<template>
    <div class="modal-wrapper registration" v-if="showRegistration">
        <!-- desktop version -->
        <div class="modal-popup desktop-version-modal">
            <div class="modal-content desktop-version-content">
                <div class="close" @click="toggleRegistrationPopup()">✖</div>

                <div class="desktop-version-content-left-side">
                    <ts-ui-registration-form />
                </div>

                <div class="desktop-version-content-right-side">
                    <div class="our-advantages">
                        <div class="title bold">
                            Зарегистрируйтесь в нашем магазине, чтобы
                        </div>
                        <ul class="advantages-list">
                            <li class="advantage-item">
                                <div class="icon">
                                    <div class="advantage-item-icon sales"></div>
                                </div>
                                <span class="advantage-item-text">
                                    Получить сообщения о закрытых распродажах только для наших
                                    партнеров
                                </span>
                            </li>
                            <li class="advantage-item ">
                                <div class="icon">
                                    <div class="advantage-item-icon management"></div>
                                </div>
                                <span class="advantage-item-text">
                                    Управлять своими заказами в личном кабинете: следить за статусом
                                    оплаты и доставки, хранить историю заказов
                                </span>
                            </li>
                            <li class="advantage-item ">
                                <div class="icon">
                                    <div class="advantage-item-icon access"></div>
                                </div>
                                <span class="advantage-item-text">
                                    Получить доступ к индивидуальным оптовым ценам
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- end of desktop version -->

        <!-- mobile version -->
        <div class="modal-popup mobile-version-modal">
            <div class="modal-content mobile-version-content">
                <div class="close" @click="toggleRegistrationPopup()">✖</div>

                <!-- <carousel :perPage="1" class="mobile-version-content-carousel">
                    <slide class="mobile-version-content-header">
                        <div class="reg-in-our-shop bold text-center">
                            Зарегистрируйтесь
                            <br />
                            в нашем магазине, чтобы
                        </div>
                        <div class="rows-and-gear-icon"></div>
                        <div class="order-management text-center">
                            Управлять своими заказами в личном кабинете: следить за статусом оплаты
                            и доставки, хранить историю заказов
                        </div>
                    </slide>
                </carousel> -->

                <div class="mobile-version-content-main">
                    <ts-ui-registration-form></ts-ui-registration-form>
                </div>
            </div>
        </div>
        <!-- end of mobile version -->
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Carousel, Slide } from 'vue-carousel'
import RegistrationForm from '@/components/authorization/registration/registration-form/registration-form.vue'
import { mixins } from 'vue-class-component'
import { ClosablePopup } from '@/components/mixins/closable-popup'
import { DisplayModule } from '@/store/modules/display.module'
import { store } from '@/store/index'

@Component({
    components: {
        Carousel,
        Slide,
        'ts-ui-registration-form': RegistrationForm,
    },
})
export default class Registration extends mixins(ClosablePopup) {
    toggleRegistrationPopup() {
        store.dispatch('display/toggleRegistration')
    }

    get showRegistration() {
        return DisplayModule.showPopup.registration
    }

    listenEscKeyup(e: KeyboardEvent) {
        if (e.keyCode === 27 && this.showRegistration) {
            store.dispatch('display/toggleRegistration')
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import 'registration-styles.scss';
</style>
