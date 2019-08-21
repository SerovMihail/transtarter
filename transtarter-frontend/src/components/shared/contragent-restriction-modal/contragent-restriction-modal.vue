<template>
    <div class="contragent-restriction-modal">
        <app-modal :status="modalStatus" @statusChange="modalStatus = $event">
            <div class="app-modal__title">Ваш профиль имеет ограничения к заказу товаров.</div>
            <div class="app-modal__message">Причина: {{ restrictionMessage }}</div>
        </app-modal>
    </div>
</template>
<script src="./contragent-restriction-modal.ts" lang="ts"></script>
