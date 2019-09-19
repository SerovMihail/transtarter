<template>
    <app-modal :status="contragentOpen" :not-closable="forLogin" @statusChange="onClose($event)">
        <app-loading v-if="isLoading" />
        <div class="app-modal__title">
            Выберите контрагента
        </div>
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
    </app-modal>
</template>

<script src="./contragent-modal.ts" lang="ts"></script>
<style src="./contragent-modal.scss" lang="scss"></style>
