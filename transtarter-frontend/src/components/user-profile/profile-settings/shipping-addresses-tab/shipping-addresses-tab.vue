<template>
    <div class="shipping-addresses-tab">
        <div class="address-names">Адреса доставки</div>
        <ul class="exist-addresses">
            <li class="exist-address">
                <div class="text">
                    Москва, ул. Ткаченко, 23-5, Транспортная компания ПЭК
                </div>
                <div class="edit-block">
                    <span class="icon save"></span>
                    <span class="icon edit"></span>
                </div>
            </li>
            <li class="exist-address">
                <div class="text">
                    г. Дзержинский, ул. Ленина, 145, Самовывоз
                </div>
                <div class="edit-block">
                    <span class="icon save"></span>
                    <span class="icon edit"></span>
                </div>
            </li>
        </ul>
        <button class="btn btn-outline btn-block-mobile">Добавить ещё адрес</button>

        <div class="new-address">
            <div class="title">Новый адрес</div>
            <form>
                <div class="form-group row">
                    <label class="col-xl-4 big-label mobile-top-label">Способ доставки</label>
                    <div class="col-xl-6 col-12">
                        <select class="form-control">
                            <option disabled value="">Выберите один из вариантов</option>
                            <option>Самовывоз</option>
                            <option>Доставка</option>
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
                                    class="radio"
                                    id="radio1"
                                    name="deliver-address"
                                />
                                <label for="radio1" class="radio-label">
                                    г. Дзержинский, ул. Энергетиков 18А
                                </label>
                            </li>
                            <li class="address">
                                <input
                                    type="radio"
                                    class="radio"
                                    id="radio2"
                                    name="deliver-address"
                                />
                                <label for="radio2" class="radio-label">
                                    г. Москва, Каширское шоссе, 41
                                </label>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="form-group row" style="align-items: flex-start;">
                    <label class="col-xl-4 big-label mobile-top-label">Адрес доставки</label>
                    <div class="col-xl-6 col-12">
                        <textarea
                            type="text"
                            class="form-control-lg"
                            placeholder="г. Москва, ул. Ткаченко, 23-5"
                            rows="8"
                        />
                    </div>
                </div>

                <div class="form-group row row-with-big-space">
                    <label class="col-xl-4 col-0"></label>
                    <div class="col-xl-6 col-12">
                        <button type="submit" class="btn btn-yellow btn-block-mobile">
                            Добавить адрес
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
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class ShippingAddressesTab extends Vue {}
</script>

<style lang="scss">
@import './shipping-addresses-tab-styles.scss';
</style>
