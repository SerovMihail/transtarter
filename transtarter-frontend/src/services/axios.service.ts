import axios, { AxiosRequestConfig } from 'axios'

const webAppHost = process.env.VUE_APP_WEB_APP
const axiosRequestConfig: AxiosRequestConfig = {
    baseURL: webAppHost,
    withCredentials: true,
}

const instance = axios.create(axiosRequestConfig)

export default instance
