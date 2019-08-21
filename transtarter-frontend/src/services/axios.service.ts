import axios, { AxiosRequestConfig } from 'axios'

const webApi = process.env.VUE_APP_WEB_APP_API
const axiosRequestConfig: AxiosRequestConfig = {
    baseURL: webApi,
    withCredentials: true,
}

const instance = axios.create(axiosRequestConfig)

export default instance
