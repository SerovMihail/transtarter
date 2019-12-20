import axios, { AxiosResponse } from 'axios'
import { IMapMarks, ICitiesCoords } from '@/models/map'
const bitrixCmsRootUrl = process.env.VUE_APP_BITRIX_CMS
export class MapService {
    getCitiesCoords(): Promise<AxiosResponse<ICitiesCoords>> {
        return axios.get(`${bitrixCmsRootUrl}/static-files/cities-coords.json`)
    }
    getMapMarks(): Promise<AxiosResponse<IMapMarks>> {
        return axios.get(`${bitrixCmsRootUrl}/static-files/map-marks.json`)
    }
}
