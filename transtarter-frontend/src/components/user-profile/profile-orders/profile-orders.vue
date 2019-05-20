<template>
    <div>
        <div class="title">
            Личный кабинет
        </div>
        <p>
            Здравствуйте! Спасибо за регистрацию. Сейчас вам доступны розничные цены на ассортимент.
        </p>
        <h2>Заполните данные для доставки, они понадобятся при оформлении заказа.</h2>

        <form>
            <div class="form-group row">
                <label class="col-xl-4 big-label mobile-top-label">Способ доставки</label>
                <div class="col-xl-6 col-12">
                    <select class="form-control" name="" id="">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                    </select>
                </div>
            </div>
            <div class="form-group row ">
                <label class="col-xl-4 big-label mobile-top-label">Контактное лицо</label>
                <div class="col-xl-6 col-12">
                    <input type="text" placeholder="Егор Воронов" class="form-control-lg" />
                </div>
            </div>
            <div class="form-group row row-with-big-space">
                <label class="col-xl-4 big-label mobile-top-label">Телефон</label>
                <div class="col-xl-6 col-12">
                    <input type="text" placeholder="+7 (900) 111-11-11" class="form-control-lg" />
                </div>
            </div>
            <div class="form-group row">
                <label class="col-xl-4 big-label mobile-top-label">Email</label>
                <div class="col-xl-6 col-12">
                    <input type="text" placeholder="voronov@gmail.com" class="form-control-lg" />
                </div>
            </div>
            <div class="form-group row row-with-big-space">
                <label class="col-xl-4 col-6 big-label">Пароль</label>
                <label class="col-xl-6 col-6 green-link border-green text-left text-right-mobile">
                    Сменить пароль
                </label>
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
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
    components: {},
})
export default class ProfileOrders extends Vue {
    data: string = 'test data'
}
</script>
