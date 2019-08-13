import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'
import { store } from '../index'

import { AuthService } from '@/services/auth.service'
import { User } from 'oidc-client'
import { IKeyUserObject } from '@/models/index'
import CookieStorage from 'cookie-storage-domain'
import {
    COOKIE_AUTH_BEFORE_REDIRECT_LOCATION_KEY,
    COOKIE_STORAGE_KEY,
    COOKIE_SELECTED_CONTRAGENT,
    COOKIE_TS_USER_CONTRAGENT,
} from '@/constants'
import { ProfileService } from '@/services/profile.service'
import { CartApiService } from '@/services/cart.api.service'
const cartApiService = new CartApiService()

const userContragentsString = <string>CookieStorage.getItem(COOKIE_TS_USER_CONTRAGENT)
const contragentString = <string>CookieStorage.getItem(COOKIE_SELECTED_CONTRAGENT)
const contragent: any = contragentString ? JSON.parse(contragentString) : null
const profileService = new ProfileService()

const userContragents = userContragentsString ? JSON.parse(userContragentsString) : null

type contragent = { id: number; name: string; city: string }

export interface IAuthState {
    name: string
    email: string
    password: string
    token: string
    profile: any
    avatar: string
    roles: string[]
    contragent: any
    userContragents: any
    itemsAmount?: null | number
    status: {
        loggingIn: boolean
        loggedIn: boolean
    }
}

@Module({ dynamic: true, store, name: 'auth', namespaced: true })
export class Authentication extends VuexModule implements IAuthState {
    private userInfoString = CookieStorage.getItem(COOKIE_STORAGE_KEY)
    private user = this.userInfoString ? JSON.parse(this.userInfoString) : null

    public name = ((this.user || '').profile || '').name || ''
    public email = ''
    public password = ''
    public token = (this.user || '').id_token || ''
    public roles = []
    public contragent = null
    public userContragents = []
    public profile = null
    public status = {
        loggingIn: false,
        loggedIn: this.user !== null && !(this.user || false).expired, // we should get user info and expired have to be false
    }
    public avatar = ''
    itemsAmount = null

    accessTokenExpired: boolean | undefined

    auth = new AuthService()

    get logged() {
        return this.status.loggedIn
    }

    @Mutation
    LOGIN_REQUEST() {
        this.status.loggingIn = true
    }

    @Mutation
    LOGOUT() {
        this.status.loggedIn = false
        this.status.loggingIn = false
    }

    @Mutation
    SUCCESS_LOGIN({ user, userProfile }) {
        this.name = user.profile.name
        this.token = user.id_token
        this.accessTokenExpired = user.expired
        this.status.loggedIn = user !== null && !user.expired
        this.status.loggingIn = false
        this.contragent = contragent
        this.userContragents = userContragents
        this.profile = userProfile
    }

    @Mutation
    ERROR_LOGIN() {
        this.name = ''
        this.accessTokenExpired = false
        this.status.loggedIn = false
        this.status.loggingIn = false
    }

    @Mutation
    MOCK_LOGIN() {
        this.status.loggedIn = true
    }

    @Mutation
    MOCK_LOGOUT() {
        this.status.loggedIn = false
    }

    @Action
    public login(): void {
        CookieStorage.setItem(
            COOKIE_AUTH_BEFORE_REDIRECT_LOCATION_KEY,
            JSON.stringify(window.location.href)
        )

        this.auth.login()
    }

    @Action
    public async actualizeUser() {
        let user: User | null = null
        let userProfile: any | null = null

        try {
            user = await this.auth.getUser()
        } catch (err) {
            console.log(err)
        }

        if (!user || user.expired) {
            this.auth.removeAuthCookies()
            this.context.commit('ERROR_LOGIN')
            return
        }

        if (user) {
            try {
                const userProfileResponse = await profileService.getProfileInfoByUserId(
                    user.profile.name
                )
                userProfile = userProfileResponse.data
            } catch (err) {
                console.log(err)
            }
        }
        if (user && userProfile) {
            try {
                const hasAvatarResponse = await profileService.getProfileAvatarStatusByUserId(
                    userProfile.id
                )
                if (hasAvatarResponse.status === 200) {
                    userProfile.avatarTimestamp = new Date().getTime()
                }
            } catch (e) {}
            this.auth.saveUserInfo(COOKIE_STORAGE_KEY, user)
            this.context.commit('SUCCESS_LOGIN', { user, userProfile })
        } else {
            this.context.commit('ERROR_LOGIN')
        }
    }

    @Action
    logout() {
        CookieStorage.setItem(
            COOKIE_AUTH_BEFORE_REDIRECT_LOCATION_KEY,
            JSON.stringify(window.location.href)
        )

        this.auth.logout().then(() => {
            this.auth.removeAuthCookies()
        })
    }

    @Action
    mockLogin() {
        this.context.commit('MOCK_LOGIN')
    }

    @Action
    mockLogout() {
        this.context.commit('MOCK_LOGOUT')
    }

    @Mutation
    UPDATE_USER_NAME(newUserName: string) {
        this.name = newUserName
    }

    @Action
    updateUser({ key, userObject }: IKeyUserObject) {
        this.auth.updateUserStorage(key, userObject)
        this.context.commit('UPDATE_USER_NAME', userObject.profile.name)
    }

    @Mutation
    UPDATE_CONTR_AGENT(contragent: any) {
        this.contragent = contragent
    }
    @Mutation
    UPDATE_CONTR_AGENTS(contragents: any) {
        this.userContragents = contragents
    }
    @Mutation
    async SET_CART_ITEMS_AMOUNT(amount) {
        this.itemsAmount = amount
    }
    @Action
    async updateContrAgent(contragent: any) {
        CookieStorage.setItem(COOKIE_SELECTED_CONTRAGENT, contragent)
        await this.context.commit('UPDATE_CONTR_AGENT', contragent)
        this.context.commit('SET_CART_ITEMS_AMOUNT')
        const { data: cartData } = await cartApiService.getCart()
        this.context.commit('SET_CART_ITEMS_AMOUNT', cartData.itemAggregatesCount)
    }
    @Action
    async setInitialItemsAmount() {
        const { data: cartData } = await cartApiService.getCart()
        this.context.commit('SET_CART_ITEMS_AMOUNT', cartData.itemAggregatesCount)
    }
    @Action
    updateContrAgents(contragents: any) {
        this.context.commit('UPDATE_CONTR_AGENTS', contragents)
    }
}

export const AuthModule = getModule(Authentication, store)
