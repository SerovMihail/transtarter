import axios from '@/services/axios.service'
import mainAxios, { CancelTokenSource, AxiosResponse, CancelToken } from 'axios'
import { IFavouriteDto, IFavouriteWithProductsDTO } from '@/models'
import { INT_32_MAX_VALUE } from '@/constants'

export class FavouritesApiService {
    private source: CancelTokenSource = mainAxios.CancelToken.source()
    public renewRequestToken() {
        this.source.cancel('[favourites-api.service.ts] canceling favourites cards promise request')
        this.source = mainAxios.CancelToken.source()
    }

    public getFavourites(partnerId: number): Promise<AxiosResponse<IFavouriteDto>> {
        return axios.get(`/api/partners/${partnerId}/favourites`, {
            params: {
                skip: 0,
                take: INT_32_MAX_VALUE,
            },
        })
    }
    public getFavouriteCards(
        partnerId: number,
        sortField: string,
        sortDirection: string,
        skip: number,
        take: number
    ): Promise<AxiosResponse<IFavouriteWithProductsDTO>> {
        return axios.get(`/api/partners/${partnerId}/favourites-card`, {
            params: {
                sortField,
                sortDirection,
                skip,
                take,
            },
            cancelToken: this.source.token,
        })
    }
    public addToFavourites(
        brand: string,
        number: string,
        partnerId: number
    ): Promise<AxiosResponse> {
        return axios.post('/api/favourites/', {
            brand,
            number,
            partnerId,
        })
    }
    public removeFromFavourites(id: number): Promise<AxiosResponse> {
        return axios.delete(`/api/favourites/${id}`)
    }
}
