/* eslint-disable import/no-duplicates */
import axios from '@/services/axios.service'
import { IPartnerRestrictions, IPartner, IPartnerInfo } from '@/models'
import { AxiosResponse } from 'axios'

export class PartnerApiService {
    getPartnerInfoById(id: number): Promise<AxiosResponse<IPartnerInfo>> {
        return axios.get(`/api/ts/users/${id}/info?t=${Date.now()}`)
    }

    getPartnerById(id: number): Promise<AxiosResponse<IPartner>> {
        return axios.get(`/api/Partners/${id}?t=${Date.now()}`)
    }

    getPartnerBalance(): Promise<AxiosResponse<number>> {
        return axios.get(`/api/ts/users/current/balance?t=${Date.now()}`)
    }

    getPartnerRestrictions(): Promise<AxiosResponse<IPartnerRestrictions>> {
        return axios.get(`/api/ts/users/current/restrictions?t=${Date.now()}`)
    }
}
