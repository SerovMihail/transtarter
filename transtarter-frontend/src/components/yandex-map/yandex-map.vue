<template>
    <div class="yandex-map">
        <div class="map-wrap" style="position: relative">
            <iframe id="MapFrame" ref="iframe"></iframe>
            <app-select
                class="mobile-city-select"
                native
                :options="citiesList"
                @updateOption="changeOrganizationVariant"
                :selected="selectedCity"
            ></app-select>
            <div style="position: absolute;left:4%; top: 70px; z-index:9999">
                <div style="position: absolute">
                    <div class="map-info">
                        <div class="map-info__header">
                            <div class="map-info__header-text">
                                Выберите свой или ближайший город
                            </div>

                            <app-select
                                :options="citiesList"
                                :selected="selectedCity"
                                @updateOption="changeOrganizationVariant"
                            ></app-select>
                        </div>
                        <div
                            class="map-info__body"
                            :style="showInfoBlock ? {} : { display: 'none' }"
                        >
                            <div class="map-info__section">
                                <div class="map-info__body-title">Адрес офиса:</div>
                                <div id="mapAsideAddress" class="map-info__body-content"></div>
                            </div>
                            <div class="map-info__section">
                                <div class="map-info__body-title">Контакты:</div>
                                <div class="map-info__body-content">
                                    <ul id="phone-list" class="map-info__phone-list"></ul>

                                    <!-- emails -->
                                    <div id="company-site"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script src="./yandex-map.ts" lang="ts"></script>
<style src="./yandex-map.scss" lang="scss"></style>
