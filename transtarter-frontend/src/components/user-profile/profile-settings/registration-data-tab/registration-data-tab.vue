<template>
  <div class="registration-data-tab">
    <div class="change-avatar">
      <div class="user-picture"></div>
      <div class="change-user-picture border-green">
        Изменить
      </div>
    </div>

    <form v-on:submit.prevent="updateProfileInfo">
      <div class="form-group row">
        <label class="col-xl-4 big-label mobile-top-label">Название компании</label>
        <div class="col-xl-6 col-12">
          <input
            type="text"
            class="form-control-lg"
            placeholder="ИП Воронов И.Е"
            v-model='userProfile.companyName'
          >
        </div>
      </div>
      <div class="form-group row ">
        <label class="col-xl-4 big-label mobile-top-label">Контактное лицо</label>
        <div class="col-xl-6 col-12">
          <input
            type="text"
            class="form-control-lg"
            placeholder="Егор Воронов"
            v-model='userProfile.name'
          >
        </div>
      </div>
      <div class="form-group row row-with-big-space">
        <label class="col-xl-4 big-label mobile-top-label">Телефон</label>
        <div class="col-xl-6 col-12">
          <input
            type="text"
            class="form-control-lg"
            placeholder="+7 (900) 111-11-11"
            v-model='userProfile.phoneNumber'
          >
        </div>
      </div>
      <div class="form-group row">
        <label class="col-xl-4 big-label mobile-top-label">Email</label>
        <div class="col-xl-6 col-12">
          <input
            type="text"
            class="form-control-lg"
            placeholder="voronov@gmail.com"
            v-model='userProfile.email'
          >
        </div>
      </div>
      <div class="form-group row row-with-big-space">
        <label class="col-xl-4 col-6 big-label">Пароль</label>
        <div class="col-xl-6 col-6">
          <div class="green-link border-green text-left text-right-mobile">Сменить пароль</div>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-xl-4 col-0"></label>
        <div class="col-xl-6 col-12">
          <button
            type="submit"
            class="btn btn-yellow btn-block-mobile"
          >
            Сохранить данные
          </button>
        </div>
      </div>

      <div class="row">
        <div class="col-xl-4 col-0"></div>
        <div class="col-xl-6 accept-policy col-12">
          Нажимая на кнопку, вы даете согласие
          на обработку<br> своих персональных данных
          и соглашаетесь<br> с <a
            href="/politika"
            class="policy-link solid-border-grey"
          >Политикой конфиденциальности</a>
        </div>
      </div>

    </form>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ProfileService } from '@/services/profile.service'
import { IUserProfile } from '@/models/index'
import { User } from 'oidc-client'

@Component
export default class RegistrationDataTab extends Vue {
  profileService = new ProfileService();
  userProfile = {} as IUserProfile;

  updateProfileInfo () {
    this.profileService
      .updateProfileInfo(this.userProfile)
      .then(res => {
        // eslint-disable-next-line
        console.log(res);
      })
      .catch(error => {
        // eslint-disable-next-line
        console.error(error);
      })
  }

  mounted () {
    this.getProfileInfoByUserName()
  }

  getProfileInfoByUserName () {
    const userFromLocalStorage = localStorage.getItem('user') || null
    if (!userFromLocalStorage) {
      return
    }

    const userObject = JSON.parse(userFromLocalStorage) as User
    const login = userObject.profile.name

    if (!login) {
      return
    }

    this.profileService
      .getProfileInfoByUserId(login)
      .then(res => {
        this.userProfile = res.data
      })
      .catch(error => {
        // eslint-disable-next-line
        console.error(error);
      })
  }
}
</script>

<style lang="scss">
@import "./registration-data-tab-styles.scss";
</style>
