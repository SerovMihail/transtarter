<template>
    <div v-if="status" class="app-modal">
        <div class="modal-wrapper">
            <div class="modal-popup">
                <div class="app-modal__container" :class="[size]" style="background: white;">
                    <slot />

                    <div class="app-modal__close" @click="closeModal">×</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script src="./app-modal.ts" lang="ts"></script>
<style src="./app-modal.scss" lang="scss" scoped></style>
