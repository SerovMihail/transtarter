<template>
    <div>
        <div class="container">
            <p>Buttons</p>
            <br />
            <button class="btn btn-outline">
                btn small
            </button>
            <br />
            <br />
            <button class="btn btn-md btn-outline">
                btn medium
            </button>
            <br />
            <br />

            <button disabled class="btn btn-md btn-outline">
                btn medium
            </button>
            <br />
            <br />
            <button class="btn btn-yellow">
                btn medium
            </button>

            <br />
            <br />
            <button class="btn btn-md btn-yellow">
                btn medium yellow
            </button>
            <br />
            <br />
            <button class="btn btn-lg btn-yellow">
                btn large yellow
            </button>
            <!-- RADIO BUTTON -->
            <br />
            <br />
            <H2>radio button</H2>
            <br />
            <input type="radio" id="radio1" name="deliver-address" class="radio" />
            <label for="radio1" class="radio-label">г. Дзержинский, ул. Энергетиков 18А</label>
            <!-- RADIO BUTTON END -->
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class StyleGuide extends Vue {}
</script>
