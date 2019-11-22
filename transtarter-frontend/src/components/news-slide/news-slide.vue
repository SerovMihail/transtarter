<template>
    <div class="news-slide">
        <a :href="`${newsRootUrl}/news/${newsId}`">
            <div
                class="news-slide__container"
                :style="[img ? { 'background-image': `url('${img}')` } : null]"
            >
                <div class="news-slide__container-shadow">
                    <div class="news-slide__content">
                        <div class="news-slide__title">
                            {{ title }}
                        </div>
                        <div class="news-slide__footer">
                            <span class="news-slide__category">
                                {{ category || 'Новости' }}
                            </span>
                            •
                            <span>{{ date }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    </div>
</template>
<script src="./news-slide.ts" lang="ts"></script>
<style src="./news-slide.scss" lang="scss"></style>
