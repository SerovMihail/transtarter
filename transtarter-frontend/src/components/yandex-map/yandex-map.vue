<template>
    <div class="map-wrap" style="position: relative">
        <select class="mobile-city-select">
            <option value="Москва">Москва</option>
            <option value="Калининград">Калининград</option>
        </select>

        <div style="position: absolute;left:4%; top: 70px; z-index:9999">
            <div style="position: absolute">
                <div class="map-info">
                    <div class="map-info__header">
                        <div class="map-info__header-text">Выберите свой или ближайший город</div>
                        <select name="" id="">
                            <option value="">Москва</option>
                            <option value="">Калининград</option>
                        </select>
                    </div>
                    <div class="map-info__body">
                        <div class="map-info__section">
                            <div class="map-info__body-title">Адрес офиса:</div>
                            <div class="map-info__body-content">
                                Московская область г. Дзержинский, ул. Энергетиков 18а
                            </div>
                        </div>
                        <div class="map-info__section">
                            <div class="map-info__body-title">Контакты:</div>
                            <div class="map-info__body-content">
                                8 (495) 748-97-74
                                <br />
                                <a href="mailto:kc@tstarter.ru">kc@tstarter.ru</a>
                            </div>
                        </div>
                        <!-- <div class="map-info__section">
					<div class="map-info__body-title">Часы работы:</div>
					<div class="map-info__body-content">
						Будни 8:00-20:00 <br>
						Выходные 9:00-18:00
					</div>
				</div> -->
                    </div>
                </div>
                <!-- <div class="map-leave-info">
			<div class="map-leave-info__header">
					Обсудите сотрудничество с представителем «Транс Стартер» в Москве
			</div>
			<div class="map-leave-info__body">
				<div class="map-leave-info__face"></div>
				<div class="map-leave-info__photo-caption">
					Константинопольский Константин Константинович
				</div>
				<form class="map-leave-info__form">
					<input type="text" placeholder="Как к вам обращаться?">
					<input type="text" placeholder="Введите телефон">
					<input type="email" placeholder="Введите email">
					<button class="button-yellow" type="button">Обсудить сотрудничество</button>
				</form>
				<div class="map-leave-info__agreement">
					Нажимая на кнопку, вы даете согласие на обработку своих персональных данных и соглашаетесь с Политикой конфиденциальности
				</div>
			</div>
			
		</div> -->
            </div>
        </div>

        <!-- <yandex-map
            @map-was-initialized="yaInit($event)"
            style="width: 100%; height: 624px"
            zoom="7"
            :controls="[]"
            :coords="coords"
        /> -->
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component
export default class TsMap extends Vue {
    coords = [55, 76]
    yaInit(payload) {
        console.log(payload)
    }
}
</script>
<style lang="scss">
.map-info {
    width: 360px;
    -webkit-box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.15);
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.15);
    color: #323230;
    background: white;
    margin-bottom: 10px;
}
.map-info--narrow {
    width: 262px;
}
.map-info__header {
    background-color: #0cb520;
    padding-top: 19px;
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 16px;
    color: white;
    text-align: center;
}
.map-info__header select {
    background-color: white;
    border: none;
    width: 100%;
    padding: 10px 8px 12px;
    border-radius: 2px;
}
.map-info__header select:focus {
    outline: none;
}
.map-info__header-text {
    margin-bottom: 6px;
    border-radius: 2px;
    font-size: 16px;
}
.map-info__body {
    padding: 24px 46px 22px 18px;
}
.map-info__body-title {
    font-family: 'Exo 2', sans-serif;
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 14px;
}
.map-info__body-content {
    line-height: 22px;
    font-size: 17px;
}
.map-info__body-content a {
    color: #0cb520;
}
.map-info__section:not(:last-child) {
    margin-bottom: 18px;
}
.map-info__responding-person {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
}
.map-info__responding-person-face {
    border-radius: 50%;
    border: 1px solid #0cb520;
    -ms-flex-preferred-size: 64px;
    flex-basis: 64px;
    height: 64px;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    margin-right: 14px;
    background-repeat: no-repeat;
    background-position: cneter;
}
.map-info__responding-person-name {
    color: red;
    font-size: 17px;
    font-weight: bold;
    color: #323230;
}
.map-info__responding-person-position {
    color: #a3a3a2;
    font-size: 14px;
    line-height: 20px;
}
@media (max-width: 768px) {
    .map-info {
        display: none;
    }
}
.map-leave-info {
    width: 360px;
    background: white;
    -webkit-box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.15);
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.15);
    color: #323230;
    color: #323230;
}
.map-leave-info--narrow {
    width: 262px;
}
.map-leave-info--narrow .map-leave-info__header {
    font-size: 16px;
    padding: 16px 28px 12px;
    line-height: 22px;
}
.map-leave-info--narrow .map-leave-info__body {
    padding: 10px 15px;
}
.map-leave-info--narrow .map-leave-info__form input {
    margin-bottom: 4px;
}
.map-leave-info--narrow .map-leave-info__agreement {
    font-size: 12px;
}
.map-leave-info--narrow .button-yellow {
    padding: 10px 20px;
    line-height: 22px;
    margin-top: 8px;
}
.map-leave-info__header {
    background-color: #fff1b9;
    font-family: 'Exo 2', sans-serif;
    padding: 16px 52px 12px;
    font-weight: bold;
    font-size: 20px;
    line-height: 28px;
    text-align: center;
}
.map-leave-info__body {
    background-color: white;
    padding: 10px 44px;
}
.map-leave-info__face {
    width: 64px;
    height: 64px;
    border: 1px solid #0cb520;
    border-radius: 50%;
    background-image: url('https://res.cloudinary.com/duz1yo4sl/image/upload/v1553248980/face.jpg');
    margin: 0 auto;
    margin-bottom: 8px;
    margin-top: 10px;
}
.map-leave-info__photo-caption {
    font-weight: bold;
    padding: 0 10px;
    text-align: center;
    margin-bottom: 14px;
}
.map-leave-info__form input {
    font-family: 'PT Sans', sans-serif;
    color: #a3a3a2;
    width: 100%;
    border: 1px solid #d2d2d2;
    height: 40px;
    margin-bottom: 10px;
    border-radius: 4px;
    padding-left: 14px;
    font-size: 16px;
    padding-top: 4px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.map-leave-info__form input:focus {
    outline: none;
    border: 1px solid #0cb520;
}
.map-leave-info__agreement {
    margin-top: 10px;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    color: #a3a3a2;
    font-size: 12px;
    line-height: 14px;
    margin-top: 12px;
    margin-bottom: 6px;
    padding: 0 10px;
}
.map-leave-info__select-city {
    background-color: #0cb520;
    padding-top: 19px;
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 16px;
    color: white;
    text-align: center;
}
.map-leave-info__select-city select {
    background-color: white;
    border-radius: 4px;
    border: none;
    width: 100%;
    padding: 10px 8px 12px;
}
.map-leave-info__select-city-text {
    margin-bottom: 6px;
    border-radius: 2px;
    font-size: 16px;
}
.map-leave-info__form-text {
    color: #323230;
    font-size: 14px;
    text-align: center;
    margin-bottom: 0.4em;
    margin-top: 10px;
    line-height: 19px;
}
@media (max-width: 768px) {
    .map-leave-info {
        display: none;
    }
}
.map-leave-info--mobile {
    display: none;
}
@media (max-width: 768px) {
    .map-leave-info--mobile {
        display: block;
        width: 100%;
    }
}
.button-yellow {
    cursor: pointer;
    background: -webkit-gradient(
        linear,
        left top,
        left bottom,
        color-stop(4.1%, #ffd600),
        to(#ffc600)
    );
    background: linear-gradient(180deg, #ffd600 4.1%, #ffc600 100%);
    -webkit-box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.194378), 0px 1px 0px #e29401;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.194378), 0px 1px 0px #e29401;
    border-radius: 4px;
    border: none;
    width: 100%;
    padding: 10px 16px;
    font-size: 16px;
    text-align: center;
    font-family: 'Exo 2', sans-serif;
}
.button-yellow:focus {
    outline: none;
}
.button-yellow:hover,
.button-yellow:focus {
    background: -webkit-gradient(
        linear,
        left top,
        left bottom,
        color-stop(7.44%, #ffe200),
        to(#ffcf00)
    );
    background: linear-gradient(180deg, #ffe200 7.44%, #ffcf00 100%);
}
.button-yellow:active {
    background: -webkit-gradient(
        linear,
        left bottom,
        left top,
        color-stop(3.62%, #ffb300),
        color-stop(95.9%, #ffbc00)
    );
    background: linear-gradient(0deg, #ffb300 3.62%, #ffbc00 95.9%);
}
.button-semi-bold {
    font-weight: 600;
}
.baloon-info {
    background: #ffffff;
    -webkit-box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.30214);
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.30214);
    max-width: 262px;
    position: relative;
}
.baloon-info * {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.baloon-info::before {
    position: absolute;
    content: '';
    display: block;
    width: 12px;
    height: 12px;
    -webkit-transform: rotate(45deg) translateX(-70%);
    transform: rotate(45deg) translateX(-70%);
    top: 0;
    background: white;
    left: 50%;
    -webkit-box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.32214);
    box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.32214);
}
.baloon-info__container {
    background: white;
    position: relative;
    padding: 16px;
    position: relative;
}
.baloon-info__body {
    padding: 16px;
}
.baloon-info__close-btn {
    position: absolute;
    right: 10px;
    top: 10px;
    width: 12px;
    height: 12px;
    cursor: pointer;
}
.baloon-info__close-btn:hover::before,
.baloon-info__close-btn:hover::after {
    background: #323230;
}
.baloon-info__close-btn::before,
.baloon-info__close-btn::after {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2px;
    height: 100%;
    background: #a3a3a2;
}
.baloon-info__close-btn::before {
    -webkit-transform: translate(-50%, -50%) rotate(45deg);
    transform: translate(-50%, -50%) rotate(45deg);
}
.baloon-info__close-btn::after {
    -webkit-transform: translate(-50%, -50%) rotate(-45deg);
    transform: translate(-50%, -50%) rotate(-45deg);
}
.ya-maps {
    max-width: 232px;
    font-family: 'PT Sans';
    font-size: 14px;
}
.ya-maps__header {
    font-family: 'PT Sans';
    font-weight: bold;
    font-size: 16px;
    line-height: 24px;
    color: #323230;
}
.ya-maps__phone {
    display: block;
    margin-top: 16px;
    font-size: 18px;
}
.ya-maps__phone-link {
    color: black;
    text-decoration: none;
}
.ya-maps__email {
    font-size: 16px;
    color: #0cb520;
    line-height: 32px;
    text-decoration: underline;
    margin-top: 8px;
    display: inline-block;
}
.ya-maps__email:hover {
    color: #0ecd24;
}
.ya-maps__face {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    border: 2px solid #0cb520;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    margin-right: 16px;
}
.ya-maps__person {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin-top: 10px;
}
.ya-maps__person-name {
    font-weight: bold;
    font-size: 16px;
    line-height: 24px;
}
.ya-maps__person-position {
    color: #686868;
    font-size: 12px;
    line-height: 18px;
}
.ya-maps__zoom-control {
    cursor: pointer;
    position: relative;
    width: 57px;
    height: 57px;
    background: #0cb520;
    border-radius: 50%;
}
.ya-maps__zoom-control:first-child {
    margin-bottom: 10px;
}
.ya-maps__zoom-svg-icon {
    width: 32px;
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translateX(-50%) translateY(-50%);
    transform: translateX(-50%) translateY(-50%);
}
#map {
    width: 100%;
    height: 400px;
}
@media (max-width: 768px) {
    #map {
        height: 632px;
    }
}
.mobile-city-select {
    display: block;
    background: #ffffff;
    -webkit-box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.15);
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    width: 288px;
    height: 40px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 10px 8px 12px;
    position: absolute;
    left: 50%;
    top: 24px;
    z-index: 99;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
}
.mobile-city-select:focus,
.mobile-city-select:active {
    outline: none;
}
@media (min-width: 768px) {
    .mobile-city-select {
        display: none;
    }
}
</style>
