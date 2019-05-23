import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'
import { store } from '../index'

import { AuthService } from '@/services/auth.service'
import { User } from 'oidc-client'
import { IKeyUserObject } from '@/models/index'
import CookieStorage from 'cookie-storage-domain'
import Axios from 'axios'
import { COOKIE_AUTH_BEFORE_REDIRECT_LOCATION_KEY, COOKIE_STORAGE_KEY } from '@/constants'

const userContragentsString = <string>CookieStorage.getItem('ts-user-contragent')
debugger
const contragentString = <string>CookieStorage.getItem('selected-contragent')
const contragent: any = contragentString ? JSON.parse(contragentString) : null

const userContragents = userContragentsString ? JSON.parse(userContragentsString) : null

type contragent = { id: number; name: string; city: string }

export interface IAuthState {
    name: string
    email: string
    password: string
    token: string
    avatar: string
    roles: string[]
    contragent: any
    userContragents: any
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
    public status = {
        loggingIn: false,
        loggedIn: this.user !== null && !(this.user || false).expired, // we should get user info and expired have to be false
    }
    public avatar = ''

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
    SUCCESS_LOGIN(user: User) {
        this.name = user.profile.name
        this.token = user.id_token
        this.accessTokenExpired = user.expired
        this.status.loggedIn = user !== null && !user.expired
        this.status.loggingIn = false
        this.contragent = contragent
        this.userContragents = userContragents
    }

    @Mutation
    ERROR_LOGIN(user: User) {
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
    public actualizeUser() {
        this.auth.getUser().then(user => {
            if (user) {
                this.auth.saveUserInfo(COOKIE_STORAGE_KEY, user)
                this.context.commit('SUCCESS_LOGIN', user)
            } else {
                this.context.commit('ERROR_LOGIN')
            }
        })
    }

    @Action
    logout() {
        CookieStorage.setItem(
            COOKIE_AUTH_BEFORE_REDIRECT_LOCATION_KEY,
            JSON.stringify(window.location.href)
        )

        this.auth.logout().then(() => {
            this.auth.removeFromCookieStorageByKey(COOKIE_STORAGE_KEY)
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
    UPDATE_CONTR_AGENT(state, contragent: any) {
        this.contragent = contragent
    }
    @Mutation
    UPDATE_CONTR_AGENTS(state, contragents: any) {
        this.userContragents = contragents
    }
    @Action
    updateContrAgent(contragent: any) {
        CookieStorage.setItem('selected-contragent', contragent)
        this.context.commit('UPDATE_CONTR_AGENT', contragent)
    }
    @Action
    updateContrAgents(contragents: any) {
        this.context.commit('UPDATE_CONTR_AGENTS', contragents)
    }
}

export const AuthModule = getModule(Authentication, store)
