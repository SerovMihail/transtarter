import axios, { AxiosRequestConfig } from 'axios'
import CookieStorage from 'cookie-storage-domain'
import { COOKIE_OLD_CATALOG_TS_USER_KEY } from '@/constants'

const webApi = process.env.VUE_APP_WEB_APP_API
const axiosRequestConfig: AxiosRequestConfig = {
    baseURL: webApi,
    withCredentials: false,
}

const instance = axios.create(axiosRequestConfig)

instance.interceptors.request.use(config => {
    const tsUserAuthCookie = CookieStorage.getItem(COOKIE_OLD_CATALOG_TS_USER_KEY)
    const tsUserAuthCookieValue = tsUserAuthCookie ? JSON.parse(tsUserAuthCookie) : undefined
    if (tsUserAuthCookieValue) {
        config.auth = {
            username: tsUserAuthCookieValue.login,
            password: tsUserAuthCookieValue.password,
        }
    }

    return config
})

export default instance
