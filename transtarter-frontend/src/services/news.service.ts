import axios, { AxiosResponse } from 'axios'
import { IDetailedNews, IPreviewNews } from '@/models/news'
const bitrixCmsRootUrl = process.env.VUE_APP_BITRIX_CMS
export class NewsService {
    getDetailedNews(newsId: number): Promise<AxiosResponse<IDetailedNews>> {
        return axios.get(`${bitrixCmsRootUrl}/api/rest/ts/get_news_detail.php?elementId=443853`, {
            params: {
                elementId: newsId,
            },
        })
    }
    getNews(take?: number, pageNumber?: number): Promise<AxiosResponse<IPreviewNews>> {
        return axios.get(`${bitrixCmsRootUrl}/api/rest/ts/get_news.php`, {
            params: {
                take,
                PAGEN_1: pageNumber,
            },
        })
    }
}
