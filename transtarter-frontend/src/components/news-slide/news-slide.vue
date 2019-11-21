<template functional>
    <div class="news-slide">
        <a tag="div" :href="`${props.newsRootUrl}/news/${props.newsId}`">
            <div
                class="news-slide__container"
                :style="[props.img ? { 'background-image': `url('${props.img}')` } : null]"
            >
                <div class="news-slide__container-shadow">
                    <div class="news-slide__content">
                        <div class="news-slide__title">
                            {{ props.title }}
                        </div>
                        <div class="news-slide__footer">
                            <span class="news-slide__category">
                                {{ props.category || 'Новости' }}
                            </span>
                            •
                            <span>{{ props.date }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    </div>
</template>
<script src="./news-slide.ts" lang="ts"></script>
<style src="./news-slide.scss" lang="scss" scoped></style>
