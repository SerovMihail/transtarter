<template>
    <div class="news-block-container">
        <div class="news-block-container__news-header">
            <h1 class="news-block-container__news-title">
                Каждый день мы пополняем ассортимент или запускаем новую акцию
            </h1>
            <a :href="`${vueAppWebApp}/news`" class="news-block-container__news-all">
                Все новости
            </a>
        </div>
        <mq-layout mq="desktop">
            <news-block :items="news" />
        </mq-layout>
        <mq-layout :mq="['laptop', 'mobile']">
            <news-block small :items="news" />
        </mq-layout>
        <mq-layout :mq="'tablet'">
            <carousel
                autoplay
                :per-page="1"
                :pagination-enabled="false"
                :space-padding="20"
                :loop="true"
                :navigate-to="[4, false]"
            >
                <slide v-for="newsItem of news" :key="newsItem.id" :title="'Изображение'">
                    <newsSlide
                        :news-id="newsItem.id"
                        :date="newsItem.date"
                        :title="newsItem.title"
                        :category="newsItem.badgeName"
                        :img="newsItem.previewPicture"
                        :newsRootUrl="vueAppWebApp"
                    />
                </slide>
            </carousel>
        </mq-layout>
    </div>
</template>
<script src="./news-block-container.ts" lang="ts"></script>
<style src="./news-block-container.scss" lang="scss" scoped></style>
