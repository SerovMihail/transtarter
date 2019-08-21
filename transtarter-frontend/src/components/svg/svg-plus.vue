<template>
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" width="2" height="8" fill="#A3A3A2"></rect>
        <rect x="8" y="3" width="2" height="8" transform="rotate(90 8 3)" fill="#A3A3A2"></rect>
    </svg>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component({})
class SvgPlus extends Vue {}
export default SvgPlus
</script>
