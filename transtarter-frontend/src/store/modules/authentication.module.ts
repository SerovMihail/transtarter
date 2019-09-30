import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'
import { store } from '../index'
import { AuthService } from '@/services/auth.service'
import { User } from 'oidc-client'
import { IKeyUserObject, IPartnerRestrictions, IPartner } from '@/models/index'
import CookieStorage from 'cookie-storage-domain'
import {
    COOKIE_AUTH_BEFORE_REDIRECT_LOCATION_KEY,
    COOKIE_STORAGE_KEY,
    COOKIE_SELECTED_CONTRAGENT,
    COOKIE_TS_USER_CONTRAGENT,
    COOKIE_OLD_CATALOG_TS_USER_KEY,
} from '@/constants'
import { ProfileService } from '@/services/profile.service'
import { CartApiService } from '@/services/cart.api.service'
import { PartnerApiService } from '@/services/partner-api.service'

const profileService = new ProfileService()
const partnerApiService = new PartnerApiService()
const cartApiService = new CartApiService()

const userContragentsString = <string>CookieStorage.getItem(COOKIE_TS_USER_CONTRAGENT)
const contragentString = <string>CookieStorage.getItem(COOKIE_SELECTED_CONTRAGENT)
const contragent: any = contragentString ? JSON.parse(contragentString) : null

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
    partnerProfile: IPartner | null
    userContragents: any
    itemsAmount?: null | number
    status: {
        isLoading: boolean
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
    public contragent: any = null
    public partnerProfile: IPartner | null = null
    public userContragents = []
    public profile = null
    public status = {
        isLoading: true,
        loggingIn: true,
        loggedIn: false,
    }
    public avatar = ''
    itemsAmount = null

    accessTokenExpired: boolean | undefined

    auth = new AuthService()

    get logged() {
        return this.status.loggedIn
    }

    get loggingIn() {
        return this.status.loggingIn
    }

    get isOrderingDisabled() {
        if (this.partnerProfile && this.partnerProfile.restrictions) {
            return (
                this.partnerProfile.restrictions.isCreditOverflow ||
                this.partnerProfile.restrictions.isDurationOverflow
            )
        }
    }

    get contragentIsSingle() {
        if (this.userContragents && this.userContragents.length) {
            return this.userContragents.length === 1
        }

        return false
    }

    @Mutation
    START_LOADING() {
        this.status.isLoading = true
    }

    @Mutation
    STOP_LOADING() {
        this.status.isLoading = false
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
    UPDATE_USER_NAME(newUserName: string) {
        this.name = newUserName
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
    SET_CART_ITEMS_AMOUNT(amount) {
        this.itemsAmount = amount
    }

    @Mutation
    UPDATE_PARTNER(partner: IPartner) {
        this.partnerProfile = partner
    }

    @Action
    public login(): void {
        CookieStorage.setItem(
            COOKIE_AUTH_BEFORE_REDIRECT_LOCATION_KEY,
            JSON.stringify(window.location.href)
        )

        this.auth.login()
    }

    @Action({ rawError: true })
    public async actualizeUser() {
        this.context.commit('START_LOADING')

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
            this.context.commit('STOP_LOADING')
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

            await this.context.dispatch('updateCartInfo')
            await this.context.dispatch('updatePartner')
        } else {
            this.context.commit('ERROR_LOGIN')
        }

        this.context.commit('STOP_LOADING')
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
    updateUser({ key, userObject }: IKeyUserObject) {
        this.auth.updateUserStorage(key, userObject)
        this.context.commit('UPDATE_USER_NAME', userObject.profile.name)
    }

    @Action
    updatePartnerCredentials(data) {
        CookieStorage.setItem(COOKIE_OLD_CATALOG_TS_USER_KEY, JSON.stringify(data))
    }

    @Action
    async updateContrAgent(contragent: any) {
        CookieStorage.setItem(COOKIE_SELECTED_CONTRAGENT, JSON.stringify(contragent))
        await this.context.commit('UPDATE_CONTR_AGENT', contragent)
        await this.context.dispatch('updateCartInfo')
        await this.context.dispatch('updatePartner')
    }

    @Action
    async updateCartInfo() {
        const { data: cartData } = await cartApiService.getCart()
        this.context.commit('SET_CART_ITEMS_AMOUNT', cartData.itemAggregatesCount)
    }

    @Action
    async updatePartner() {
        if (!this.contragent) {
            return
        }

        try {
            const { data: partner } = await partnerApiService.getPartnerById(this.contragent.id)
            const { data: partnerBalance } = await partnerApiService.getPartnerBalance()
            const { data: partnerRestrictions } = await partnerApiService.getPartnerRestrictions()

            partner.balance = partnerBalance
            partner.restrictions = partnerRestrictions

            this.context.commit('UPDATE_PARTNER', partner)
        } catch (err) {}
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
