<template>
    <div>
        <div class="page-container">
            <div class="title">
                Личный кабинет
            </div>
            <p class="title-info-text">
                Здравствуйте! Спасибо за регистрацию. В ближайшее время менеджер свяжется с вами и
                откроет оптовые цены на весь ассортимент.
            </p>
            <h2 class="form-title">
                Заполните данные для доставки, они понадобятся при оформлении заказа.
            </h2>

            <form>
                <div class="form-group row" style="aling-items: flex-start;">
                    <label class="col-xl-4 big-label mobile-top-label">Способ доставки</label>
                    <div class="col-xl-6 col-12">
                        <select class="form-control" name="" id="">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                        </select>
                    </div>
                </div>

                <div class="form-group row row-with-big-space" style="align-items: flex-start;">
                    <label class="col-xl-4 col-12 big-label">Точка выдачи</label>
                    <div class="col-xl-6 col-12  text-left">
                        <div class="city green-link border-green">
                            Москва
                        </div>
                        <ul class="addresses">
                            <li class="address">
                                <input
                                    type="radio"
                                    id="radio1"
                                    name="deliver-address"
                                    class="radio"
                                />
                                <label for="radio1" class="radio-label">
                                    г. Дзержинский, ул. Энергетиков 18А
                                </label>
                            </li>
                            <li class="address">
                                <input
                                    type="radio"
                                    id="radio2"
                                    name="deliver-address"
                                    class="radio"
                                />
                                <label for="radio2" class="radio-label">
                                    г. Москва, Каширское шоссе, 41
                                </label>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="form-group row row-with-big-space" style="align-items: flex-start;">
                    <label class="col-xl-4 big-label mobile-top-label">Адрес доставки</label>
                    <div class="col-xl-6 col-12">
                        <textarea
                            type="text"
                            placeholder="г. Москва, ул. Ткаченко, 23-5"
                            rows="8"
                            class="form-control-lg"
                        ></textarea>
                    </div>
                </div>

                <div class="form-group row">
                    <label class="col-xl-4 col-0"></label>
                    <div class="col-xl-6 col-12">
                        <button
                            @click="submitData"
                            type="button"
                            class="btn btn-yellow btn-block-mobile"
                        >
                            Сохранить данные
                        </button>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xl-4 col-0"></div>
                    <div class="col-xl-6 accept-policy col-12">
                        Нажимая на кнопку, вы даете согласие на обработку
                        <br />
                        своих персональных данных и соглашаетесь
                        <br />
                        с
                        <a href="/politika" class="policy-link solid-border-grey">
                            Политикой конфиденциальности
                        </a>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator'

@Component({
    components: {},
})
export default class fillOutAddress extends Vue {
    @Emit('fill-out-status')
    submitData(): string {
        return 'mainProfileHome'
    }
}
</script>
