import axios from 'axios'
import { Guid } from 'guid-typescript'
import { IUserProfile } from '@/models/IUserProfile'

export class ProfileService {
    private webAppHost = process.env.VUE_APP_WEB_APP;

    public getProfileInfoByUserId (userId : Guid) {
      return axios.get<IUserProfile>(`${this.webAppHost}/api/profile/${userId}`)
        .then(x => x)
    }

    public updateProfileInfo (updatedUserProfile: IUserProfile) {
      return axios.put<boolean>(`${this.webAppHost}/api/profile`, updatedUserProfile)
        .then(x => x)
    }
}