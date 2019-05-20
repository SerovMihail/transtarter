<template>
  <div>
    <div class="registration-text">
      Регистрация
    </div>

    <form class="registration-form" @submit.prevent="onSubmit">
      <div class="form-group">
        <label class="label">Введите имя и фамилию контактного лица</label>
        <input
          v-model="regForm.login"
          placeholder="Имя и фамилия"
          class="form-control name-input"
          type="text"
          required
          :class="{ 'invalid-input': errors.UserNameError }"
          autocomplete="username"
        />
        <div v-if="errors.DuplicateUserName" class="invalid-text">
          Пользователь с таким именем уже существует
        </div>
        <div v-if="errors.InvalidUserName" class="invalid-text">
          Имя пользователя должно быть написано кириллицей, в имени пользователя нельзя использовать
          пробелы, специальные символы ($#!),
        </div>
      </div>

      <div class="form-group">
        <label class="label">Введите телефон</label>
        <input
          v-model="regForm.phone"
          placeholder="Телефон"
          class="form-control phone-input"
          type="tel"
          autocomplete="new-tel"
          required
        />
      </div>

      <div class="form-group">
        <label class="label">Введите email</label>
        <input
          v-model="regForm.email"
          placeholder="Почта"
          class="form-control email-input"
          type="email"
          autocomplete="new-email"
          required
        />
      </div>

      <div class="form-group">
        <label class="label">Введите пароль</label>
        <input
          v-model="regForm.password"
          placeholder="Пароль"
          class="form-control password-input"
          type="password"
          required
          utocomplete="new-password"
          :class="{ 'invalid-input': errors.passwordError }"
        />
        <div v-if="errors.PasswordError" class="invalid-text">
          пароль
          <span v-if="errors.PasswordTooShort">должен быть как минимум 6 символов.</span>
          <span v-if="errors.PasswordRequiresNonAlphanumeric">
            должен быть один спецсимвол.
          </span>
          <span v-if="errors.PasswordRequiresUpper">
            должны встречаться символы в верхнем регистре.
          </span>
          <span v-if="errors.PasswordRequiresLower">
            должны встречаться символы в нижнем регистре.
          </span>
        </div>
      </div>

      <div class="form-group">
        <label class="label">Какую организацию вы представляете?</label>

        <app-select
          :options="organizationVariants"
          :selected="organizationVariant"
          @updateOption="changeOrganizationVariant"
        />
      </div>

      <div class="form-group">
        <label class="label">Введите наименование организации</label>
        <div class="two-selectors">
          <input type="hidden" :value="organizationType.name" />
          <app-select
            class="first-selector"
            style="display: block"
            :options="organizationTypes"
            :selected="organizationType"
            @updateOption="changeOption"
          />
          <input
            v-model="regForm.organizationName"
            placeholder="Название огранизации"
            class="form-control second-selector"
            type="text"
            required
          />
        </div>
      </div>

      <button type="submit" class="btn btn-yellow btn-reg">
        Зарегистрироваться
      </button>

      <div class="accept-policy">
        Нажимая на кнопку, вы даете согласие на обработку
        <br />
        своих персональных данных и соглашаетесь
        <br />
        с
        <a href="/politika" class="policy-link solid-border-grey">
          Политикой конфиденциальности
        </a>
      </div>
    </form>

    <div class="already-have-account text-center">
      <p>Уже зарегистрированы?</p>
      <span href="#" class="go-log-in border-green" @click="logIn()">Войти</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { AuthService } from '@/services/auth.service'
import { IregistrationErrors } from '@/models/IregistrationErrors'

@Component({})
export default class RegistrationForm extends Vue {
  regForm = {
      login: '',
      phone: '',
      email: '',
      password: '',
      organizationVariant: 'Автосервис',
      organizationType: 'ООО',
      organizationName: ''
  }
  organizationTypes = [
      { name: 'ООО' },
      { name: 'ИП' },
      { name: 'Частное лицо' },
      { name: 'Другое' }
  ]
  organizationType = { name: 'OOO' }
  organizationVariants = [{ name: 'Автосервис' }, { name: 'Частное лицо' }]
  organizationVariant = { name: 'Автосервис' }
  changeOption(payload: any) {
      this.organizationType = payload
      this.regForm.organizationType = payload.name
  }
  changeOrganizationVariant(payload: any) {
      this.organizationType = payload
      this.regForm.organizationType = payload.name
  }
  errors: IregistrationErrors = {
      PasswordError: false,
      UserNameError: false
  }
  auth = new AuthService()

  logIn() {
      this.$store.dispatch('authentication/login')
      this.$store.dispatch('authentication/toggleRegistration')
  }

  handleError(errorMessages: string[]) {
      if (!errorMessages.length) {
          return
      }
      errorMessages.forEach(errorMsg => {
          this.errors[errorMsg] = true
          if (errorMsg.includes('Password')) {
              this.errors.PasswordError = true
          }
          if (errorMsg.includes('UserName')) {
              this.errors.UserNameError = true
          }
      })
  }

  onSubmit(e: Event) {
      this.auth
          .registration(this.regForm)
          .then(res => {
              this.$store.dispatch('authentication/login')
              this.$store.dispatch('display/toggleRegistration')
          })
          .catch(err => {
              const errorMessages = (((err || []).response || []).data || []) as string
              const errorMessagesArr = errorMessages.split(' ')

              this.handleError(errorMessagesArr)
          })
  }
}
</script>

<style lang="scss" src="./registration-form-styles.scss"></style>
