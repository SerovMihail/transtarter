import axios from '@/services/axios.service'
import { IUserProfile } from '@/models/IUserProfile'
import { User } from 'oidc-client'
import { store } from '@/store/index'
import CookieStorage from 'cookie-storage-domain'

export class ProfileService {
    private identityServerHost = process.env.VUE_APP_IDENTITY_SERVER
    private userKey = 'user'
    private identityUserKey = `${this.userKey}:${this.identityServerHost}:kl`

    public getProfileInfoByUserId(login: string) {
        return axios.get<IUserProfile>(`/api/profiles/${login}`).then(x => x)
    }
    public getProfileAvatarStatusByUserId(login: string) {
        const avatar = axios.get<IUserProfile>(`/api/profiles/${login}/avatar`)
        return avatar
    }
    public updateProfileInfo(updatedUserProfile: IUserProfile) {
        return axios.put<boolean>(`/api/profiles`, updatedUserProfile).then(x => {
            this.updateUserName(updatedUserProfile.name)
            return x
        })
    }

    private updateUserName(newUserName: string) {
        const key = this.identityUserKey
        const user = CookieStorage.getItem(this.userKey)
        if (!user) {
            return
        }
        const userObject = JSON.parse(user) as User
        userObject.profile.name = newUserName
        userObject.profile.preferred_username = newUserName
        CookieStorage.setItem(this.userKey, JSON.stringify(userObject))
        store.dispatch('auth/updateUser', { key, userObject })
    }
}
