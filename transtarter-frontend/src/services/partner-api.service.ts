/* eslint-disable import/no-duplicates */
import axios from '@/services/axios.service'
import { IPartnerRestrictions } from '@/models'
import { AxiosResponse } from 'axios'

export class PartnerApiService {
    private webApi = process.env.VUE_APP_WEB_APP_API

    getPartnerBalance(): Promise<AxiosResponse<number>> {
        return axios.get(`/api/ts/users/current/balance`)
    }

    getPartnerRestrictions(): Promise<AxiosResponse<IPartnerRestrictions>> {
        return axios.get(`/api/ts/users/current/restrictions`)
    }
}
