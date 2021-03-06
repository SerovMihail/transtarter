import axios from '@/services/axios.service'
import { AxiosResponse } from 'axios'

export class ProductsApiService {
    searchByNumber(
        number: string,
        take: number,
        skip?: number,
        isShortQuery: boolean = true
    ): Promise<AxiosResponse> {
        return axios.post('/api/ts/Products/search-by-number', {
            number,
            take,
            skip,
            isShortQuery,
        })
    }
}
