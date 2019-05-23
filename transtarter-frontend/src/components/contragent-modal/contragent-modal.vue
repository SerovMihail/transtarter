<template>
    <div v-if="contragentOpen" class="modal-wrapper">
        <div class="modal-popup">
            <div class="modal-content contragent-modal__container">
                <div
                    v-for="contragent in contragentOptions"
                    :key="contragent.id"
                    class="contragent-modal__item"
                >
                    <div class="contragent-modal__left-column">
                        <div class="contragent-modal__title">
                            {{ contragent.name }}
                        </div>
                        <div class="contragent-modal__city-subtitle">{{ contragent.city }}</div>
                    </div>
                    <app-btn @click="dispatchContragent(contragent)">Выбрать</app-btn>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="./contragent-modal.ts" lang="ts"></script>
<style src="./contragent-modal.scss" lang="scss"></style>
