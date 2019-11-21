<template>
    <div class="news-block">
        <div v-if="!small" :class="['news-block__large-blocks']">
            <a
                v-for="newsItem of items.slice(0, 3)"
                :key="newsItem.id"
                :href="`${vueAppWebApp}/news/${newsItem.id}`"
                :style="[
                    newsItem.previewPicture
                        ? { 'background-image': `url('${newsItem.previewPicture}')` }
                        : null,
                ]"
                :class="[
                    'news-block__large-block',
                    { 'news-block__large-block--no-image': !newsItem.previewPicture },
                ]"
            >
                <div class="news-block__large-block-shadow">
                    <div class="news-block__large-block-content">
                        <div class="news-block__large-block-title">
                            {{ newsItem.title }}
                        </div>
                        <div class="news-block__large-block-footer">
                            <span class="news-block__large-block-category">
                                {{ newsItem.badgeName || 'Новости' }}
                            </span>
                            •
                            <span>{{ newsItem.date }}</span>
                        </div>
                    </div>
                </div>
            </a>
        </div>
        <div class="news-block__small-blocks">
            <a
                v-for="newsItem of smallBlockItems"
                :key="newsItem.id"
                :href="`${vueAppWebApp}/news/${newsItem.id}`"
                :style="[
                    newsItem.previewPicture
                        ? { 'background-image': `url('${newsItem.previewPicture}')` }
                        : null,
                ]"
                :class="[
                    'news-block__small-block',
                    { 'news-block__small-block--no-image': !newsItem.previewPicture },
                ]"
            >
                <div class="news-block__small-block-shadow">
                    <div class="news-block__large-block-content">
                        <div class="news-block__small-block-title">
                            {{ newsItem.title }}
                        </div>

                        <div class="news-block__small-block-footer">
                            <span class="news-block__small-block-category">
                                {{ newsItem.badgeName || 'Новости' }}
                            </span>
                            •
                            <span>{{ newsItem.date }}</span>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    </div>
    <!-- <div
            :class="['all-news-large-item__container', { 'all-news-large-item__container--no-image': !props.img }]"
            :style="[props.img ? { 'background-image': `url('${props.img}')` } : {}]"
        >
            <div class="all-news-large-item__container all-news-large-item__container--no-image">
            <div class="all-news-large-item__container-shadow">
                <div class="all-news-large-item__content">
                    <div class="all-news-large-item__category">{{ props.category ? props.category : "Новости" }}</div>
                    <div class="all-news-large-item__heading">{{ props.title }}</div>
                    <div></div>
                    <div class="all-news-large-item__preview-text" v-html="props.previewText"></div>
                    <div class="all-news-large-item__date">{{ props.date }}</div>
                </div>
            </div>
        </div> -->
</template>
<script src="./news-block.ts" lang="ts"></script>
<style src="./news-block.scss" lang="scss" scoped></style>
