<template>
    <div class="svg-calendar">
        <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect x="3" y="6" width="2" height="2" fill="#323230" />
            <rect x="1" y="3" width="14" height="12" stroke="#323230" stroke-width="2" />
            <rect x="3" width="2" height="4" fill="#323230" />
            <rect x="11" width="2" height="4" fill="#323230" />
            <rect x="3" y="10" width="2" height="2" fill="#323230" />
            <rect x="7" y="6" width="2" height="2" fill="#323230" />
            <rect x="7" y="10" width="2" height="2" fill="#323230" />
            <rect x="11" y="6" width="2" height="2" fill="#323230" />
        </svg>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component({})
class SvgCalendar extends Vue {}
export default SvgCalendar
</script>
