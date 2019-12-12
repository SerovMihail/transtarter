import axios, { AxiosRequestConfig, AxiosInstance } from 'axios'

const identityApiTokenKey = 'token'
class AxiosIdentityWrapper {
    private readonly identityApiHost = process.env.VUE_APP_IDENTITY_SERVER_API
    private readonly identityAuthority = process.env.VUE_APP_IDENTITY_SERVER_TOKEN_AUTHORITY
    private readonly identitySettings = <any>process.env.VUE_APP_IDENTITY_API_SETTINGS
        ? JSON.parse(<any>process.env.VUE_APP_IDENTITY_API_SETTINGS)
        : {}
    instance: AxiosInstance
    errorRequestCount: number = 0
    maxErrorRequestCount: number = 3

    private get tokenRequestData() {
        console.log(this.identitySettings)
        return `client_id=${this.identitySettings.client_id}&client_secret=${
            this.identitySettings.client_secret
        }&grant_type=${this.identitySettings.grant_type}&scope=${this.identitySettings.scope}`
    }

    private get accessToken() {
        return localStorage.getItem(identityApiTokenKey)
    }

    constructor() {
        const axiosRequestConfig: AxiosRequestConfig = {
            baseURL: this.identityApiHost,
            withCredentials: false,
        }

        this.instance = axios.create(axiosRequestConfig)

        this.instance.interceptors.request.use(request => {
            const token = this.accessToken
            request.headers.Authorization = token ? `Bearer ${token}` : ''
            return request
        })

        this.instance.interceptors.response.use(
            response => {
                return response
            },
            error => {
                const status = error.response ? error.response.status : null
                if (status === 401 && this.errorRequestCount < this.maxErrorRequestCount) {
                    this.errorRequestCount++
                    return this.refreshToken().then(() => {
                        console.log('Retrying request...')
                        const token = this.accessToken
                        error.config.headers.Authorization = token ? `Bearer ${token}` : ''
                        return this.instance.request(error.config)
                    })
                }

                return Promise.reject(error)
            }
        )
    }

    private refreshToken = () => {
        return this.instance
            .post(`${this.identityAuthority}/connect/token`, this.tokenRequestData)
            .then(tokenRefreshResponse => {
                localStorage.setItem(identityApiTokenKey, tokenRefreshResponse.data.access_token)
                return Promise.resolve()
            })
    }
}

export default new AxiosIdentityWrapper().instance
