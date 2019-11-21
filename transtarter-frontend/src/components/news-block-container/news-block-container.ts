import { Vue, Component, Prop } from 'vue-property-decorator'
import NewsBlock from '@/components/news-block/news-block'
import newsSlide from '@/components/news-slide/news-slide'
import { NewsService } from '@/services/news.service'
import { IPreviewNewsItem } from '@/models/news'
import { Carousel, Slide } from 'vue-carousel'
import moment from 'moment'

import newsBlockContainer from '@/components/news-block-container/news-block-container'
moment.locale('ru')
const newsService = new NewsService()
@Component({
    components: {
        NewsBlock,
        newsSlide,
        Carousel,
        Slide,
        newsBlockContainer,
    },
})
class NewsBlockContainer extends Vue {
    async mounted() {
        const { data } = await newsService.getNews(8, 1)
        data.items.forEach(news => {
            news.date = moment(news.date, 'DD.MM.YYYY').format('D MMMM YYYY')
        })
        this.news = data.items
    }
    news: IPreviewNewsItem[] = []
    vueAppWebApp = process.env.VUE_APP_WEB_APP
}
export default NewsBlockContainer
