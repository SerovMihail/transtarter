<template>
    <div class="requisites-tab">
        <div class="organization-name">ИП Воронов Е.В.</div>
        <form>
            <div class="form-group row">
                <label class="col-xl-4 big-label mobile-top-label">ИНН</label>
                <div class="col-xl-6 col-12">
                    <input type="text" class="form-control-lg" placeholder="ИП Воронов И.Е" />
                </div>
            </div>
            <div class="form-group row ">
                <label class="col-xl-4 big-label mobile-top-label">ОГРН</label>
                <div class="col-xl-6 col-12">
                    <input type="text" class="form-control-lg" placeholder="Егор Воронов" />
                </div>
            </div>
            <div class="form-group row row-with-big-space " style="    align-items: flex-start;">
                <label class="col-xl-4 big-label mobile-top-label">Фактический адрес</label>
                <div class="col-xl-6 col-12">
                    <textarea
                        type="text"
                        class="form-control-lg"
                        placeholder="+7 (900) 111-11-11"
                        rows="8"
                    />
                </div>
            </div>
            <div class="form-group row">
                <label class="col-xl-4 col-0"></label>
                <div class="col-xl-6 col-12">
                    <button type="submit" class="btn btn-yellow btn-block-mobile">
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

        <div class="additional-organization-names">Дополнительные юр.лица</div>
        <ul class="exist-organizations">
            <li class="exist-organization">
                <div class="text">
                    ООО «Сервопривод-Макс», ИНН 6449013711, ОГРН 1026402000657, г. Москва, ул.
                    Тверская, д.18, ...
                </div>
                <div class="edit-block">
                    <span class="icon edit"></span>
                </div>
            </li>
        </ul>
        <button class="btn btn-outline btn-block-mobile">Добавить юр. лицо</button>
        <form class="add-new-organization">
            <div class="form-group row">
                <label class="col-xl-4 big-label mobile-top-label">Название компании</label>
                <div class="col-xl-6 col-12">
                    <input type="text" class="form-control-lg" placeholder="ИП «Компания»" />
                </div>
            </div>
            <div class="form-group row">
                <label class="col-xl-4 big-label mobile-top-label">ИНН</label>
                <div class="col-xl-6 col-12">
                    <input type="text" class="form-control-lg" placeholder="" />
                </div>
            </div>
            <div class="form-group row ">
                <label class="col-xl-4 big-label mobile-top-label">ОГРН</label>
                <div class="col-xl-6 col-12">
                    <input type="text" class="form-control-lg" placeholder="" />
                </div>
            </div>
            <div class="form-group row row-with-big-space " style="    align-items: flex-start;">
                <label class="col-xl-4 big-label mobile-top-label">Фактический адрес</label>
                <div class="col-xl-6 col-12">
                    <textarea
                        type="text"
                        class="form-control-lg"
                        placeholder="г. Москва, ул. Ткаченко, 23-5"
                        rows="8"
                    />
                </div>
            </div>
            <div class="form-group row">
                <label class="col-xl-4 col-0"></label>
                <div class="col-xl-6 col-12">
                    <button type="submit" class="btn btn-yellow btn-block-mobile">
                        Добавить
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
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class RequisitesTab extends Vue {}
</script>

<style lang="scss">
@import './requisites-tab-styles.scss';
</style>
