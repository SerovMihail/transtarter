import { UserManager, WebStorageStateStore, User, UserManagerSettings } from 'oidc-client'
import axios from 'axios'
import CookieStorage from 'cookie-storage-domain'
import {
    COOKIE_STORAGE_KEY,
    COOKIE_OLD_CATALOG_TS_USER_KEY,
    COOKIE_TS_USER_CONTRAGENT,
    COOKIE_SELECTED_CONTRAGENT,
} from '@/constants'

type UserRegistration = {
    email: string
    password: string
}

export class AuthService {
    private userManager: UserManager
    private identityServer = process.env.VUE_APP_IDENTITY_SERVER
    private identityServerApi = process.env.VUE_APP_IDENTITY_SERVER_API
    private webAppHost = process.env.VUE_APP_WEB_APP

    constructor() {
        const AUTH0_DOMAIN = this.identityServer
        const MY_HOST: string = window.location.origin

        const settings: UserManagerSettings = {
            userStore: new WebStorageStateStore({ store: CookieStorage }),
            stateStore: new WebStorageStateStore({ store: CookieStorage }),
            authority: AUTH0_DOMAIN,
            client_id: 'kl',
            redirect_uri: `${this.webAppHost}/callback/signin-oidc`,
            post_logout_redirect_uri: `${this.webAppHost}/callback/signout-oidc`,
            response_type: 'id_token token',
            scope: 'openid profile roles',
            filterProtocolClaims: true,
            loadUserInfo: true,
            metadata: {
                issuer: 'identity',
                authorization_endpoint: AUTH0_DOMAIN + '/connect/authorize',
                userinfo_endpoint: AUTH0_DOMAIN + '/connect/userinfo',
                end_session_endpoint: AUTH0_DOMAIN + '/connect/endsession',
                jwks_uri: AUTH0_DOMAIN + '/.well-known/openid-configuration/jwks',
            },
        }

        this.userManager = new UserManager(settings)
    }

    public registration(user: UserRegistration) {
        return axios.post<boolean>(`${this.identityServerApi}/api/account/register`, user)
    }

    public getUser(): Promise<User | null> {
        return this.userManager.getUser()
    }

    public login(): Promise<void> {
        return this.userManager.signinRedirect()
    }

    public logout(): Promise<void> {
        return this.userManager.signoutRedirect()
    }

    public saveUserInfo(key: string, user: User): void {
        CookieStorage.setItem(key, JSON.stringify(user))
    }

    public removeAuthCookies(): void {
        CookieStorage.removeItem(COOKIE_STORAGE_KEY)
        CookieStorage.removeItem(COOKIE_OLD_CATALOG_TS_USER_KEY)
        CookieStorage.removeItem(COOKIE_TS_USER_CONTRAGENT)
        CookieStorage.removeItem(COOKIE_SELECTED_CONTRAGENT)
    }

    public updateUserStorage(key: string, userObject: User): void {
        if (this.userManager.settings.userStore) {
            this.userManager.settings.userStore.set(key, JSON.stringify(userObject))
        }
    }
}
