import axios from 'axios'
import { IUserProfile } from '@/models/IUserProfile'
import { User } from 'oidc-client'
import { store } from '@/store/index'
import { CookieStorage } from 'cookie-storage';

export class ProfileService {
    private webAppHost = process.env.VUE_APP_WEB_APP;
    private identityServerHost = process.env.VUE_APP_IDENTITY_SERVER;
    private cookieStorage = new CookieStorage()
    private userKey = 'user';
    private identityUserKey = `${this.userKey}:${this.identityServerHost}:kl`;

    public getProfileInfoByUserId (login : string) {
      return axios.get<IUserProfile>(`${this.webAppHost}/api/profile/${login}`)
        .then(x => x)
    }

    public updateProfileInfo (updatedUserProfile: IUserProfile) {
      return axios.put<boolean>(`${this.webAppHost}/api/profile`, updatedUserProfile)
        .then(x => {
          this.updateUserName(updatedUserProfile.name)
          return x
        })
    }

    private updateUserName (newUserName: string) {
      const key = this.identityUserKey
      const user = this.cookieStorage.getItem(this.userKey)
      if (!user) { return }
      const userObject = JSON.parse(user) as User
      userObject.profile.name = newUserName
      userObject.profile.preferred_username = newUserName
      this.cookieStorage.setItem(this.userKey, JSON.stringify(userObject))
      store.dispatch('auth/updateUser', { key, userObject })
    }
}
