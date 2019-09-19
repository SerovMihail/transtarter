/* eslint-disable import/no-duplicates */
import axios from '@/services/axios.service'
import { IPartnerRestrictions, IPartner } from '@/models'
import { AxiosResponse } from 'axios'

export class PartnerApiService {
    getPartnerById(id: number): Promise<AxiosResponse<IPartner>> {
        return axios.get(`/api/Partners/${id}`)
    }

    getPartnerBalance(): Promise<AxiosResponse<number>> {
        return axios.get(`/api/ts/users/current/balance`)
    }

    getPartnerRestrictions(): Promise<AxiosResponse<IPartnerRestrictions>> {
        return axios.get(`/api/ts/users/current/restrictions`)
    }
}
