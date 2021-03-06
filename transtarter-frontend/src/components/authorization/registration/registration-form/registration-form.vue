<template>
    <div class="registration-container">
        <div v-if="loadingForm" class="loading-wrapper"></div>
        <div class="registration-text">
            Регистрация
        </div>
        <form class="registration-form" @submit.prevent="onSubmit">
            <spinner v-if="loadingForm" class="spinner" />
            <div class="form-group">
                <label class="label label registration-form__required-field">Email</label>
                <input
                    v-model.trim="email"
                    placeholder="Почта"
                    class="form-control email-input"
                    type="email"
                    autocomplete="new-email"
                    required
                    :class="{ 'invalid-input': errors.UserEmailError }"
                />

                <div v-if="errors.DuplicateUserName" class="invalid-text">
                    Данный email уже зарегистрирован
                </div>
                <div v-if="errors.InvalidEmail">
                    Неправильно введён email
                </div>
            </div>

            <div class="form-group">
                <label class="label  registration-form__required-field">Пароль</label>
                <div class="registration-form__password-group">
                    <input
                        ref="passwordInput"
                        v-model.trim="password"
                        placeholder="Пароль"
                        class="form-control registration-form__password-input"
                        type="password"
                        required
                        utocomplete="new-password"
                        :class="{ 'invalid-input': errors.PasswordError }"
                    />
                    <div
                        class="registration-form__password-glance-btn"
                        @click="changePasswordVisibility"
                    >
                        <component :is="svgShowPasswordComponent" />
                    </div>
                </div>
                <div v-if="errors.PasswordError" class="invalid-text">
                    Пароль
                    <span v-if="errors.PasswordTooShort">должен быть как минимум 6 символов.</span>
                    <span v-if="errors.PasswordRequiresNonAlphanumeric">
                        должен содержать как минимум один спецсимвол.
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
                <label class="label registration-form__required-field">
                    Введите фамилию контактного лица
                </label>
                <input
                    v-model.trim="userLastName"
                    placeholder="Фамилия"
                    class="form-control name-input"
                    type="text"
                    maxlength="100"
                    required
                    :class="{ 'invalid-input': errors.UserLastNameError }"
                />
                <div v-if="errors.UserLastNameError" class="invalid-text">
                    В фамилии пользователя нельзя использовать пробелы, цифры и специальные символы
                    ( $#! ).
                </div>
            </div>
            <div class="form-group">
                <label class="label registration-form__required-field">
                    Введите имя контактного лица
                </label>
                <input
                    v-model.trim="userName"
                    placeholder="Имя"
                    class="form-control name-input"
                    type="text"
                    maxlength="100"
                    required
                    :class="{ 'invalid-input': errors.UserNameError }"
                />
                <div v-if="errors.UserNameError" class="invalid-text">
                    В имени пользователя нельзя использовать пробелы, цифры и специальные символы (
                    $#! ).
                </div>
            </div>
            <div class="form-group">
                <label class="label">Введите отчество контактного лица</label>
                <input
                    v-model.trim="userPatronymic"
                    placeholder="Отчество"
                    class="form-control name-input"
                    type="text"
                    maxlength="100"
                    :class="{ 'invalid-input': errors.UserPatronymicNameError }"
                />
                <div v-if="errors.UserPatronymicNameError" class="invalid-text">
                    В отчестве пользователя нельзя использовать пробелы, цифры и специальные символы
                    ($#!).
                </div>
            </div>

            <div class="form-group">
                <label class="label registration-form__required-field">Введите телефон</label>
                <input
                    v-model.trim="phone"
                    v-mask="'+# (###) ###-##-##'"
                    placeholder="+7 (___) ___-__-__"
                    class="form-control phone-input"
                    :class="{ 'invalid-input': errors.UserPhoneError }"
                    type="tel"
                    autocomplete="new-tel"
                    required
                />
                <div v-if="errors.UserPhoneError" class="invalid-text">
                    Неправильно введён номер.
                </div>
            </div>
            <div class="form-group">
                <label class="label registration-form__required-field">
                    Введите наименование организации
                </label>
                <div class="two-selectors">
                    <app-select
                        class="first-selector"
                        style="display: block"
                        :options="organizationTypes"
                        :selected="organizationType"
                        @updateOption="changeOption"
                    />
                    <input
                        v-model.trim="organizationName"
                        placeholder="Название организации"
                        class="form-control second-selector"
                        type="text"
                        maxlength="100"
                        required
                    />
                </div>
                <div v-if="errors.OrganizationNameError" class="invalid-text">
                    В наименовании организации нельзя использовать специальные символы. ( &lt; &gt;
                    ? [ ] : | * ).
                </div>
            </div>

            <button type="submit" class="btn btn-yellow btn-reg">Зарегистрироваться</button>

            <div class="accept-policy">
                Нажимая на кнопку, вы даете согласие на обработку
                <br />
                своих персональных данных и соглашаетесь
                <br />
                с
                <a href="/policy" class="policy-link solid-border-grey">
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
import { VueMaskDirective } from 'v-mask'
import Spinner from '@/components/spinner/spinner.vue'
import AppSelect from '@/components/core-ui/app-select/app-select'
import { store } from '@/store'
import SvgEyeVisible from '@/components/svg/svg-eye-visible.vue'
import SvgEyeHidden from '@/components/svg/svg-eye-hidden.vue'
Vue.directive('mask', VueMaskDirective)

@Component({
    components: { Spinner, AppSelect, SvgEyeVisible, SvgEyeHidden },
})
export default class RegistrationForm extends Vue {
    get regForm() {
        return {
            userName: this.userName,
            userLastName: this.userLastName,
            userPatronymic: this.userPatronymic,
            phone: this.phone.replace(/[+ ()_-]/g, ''),
            email: this.email,
            password: this.password,
            companyName: this.organizationName + ' ' + this.organizationType.name,
        }
    }

    organizationTypes = [
        { name: 'ООО' },
        { name: 'ИП' },
        { name: 'Частное лицо' },
        { name: 'Другое' },
    ]
    passwordVisibility = false
    loadingForm = false
    userName = ''
    userLastName = ''
    userPatronymic = ''
    phone = ''
    email = ''
    password = ''
    organizationName = ''
    organizationType = { name: 'OOO' }
    changeOption(payload: any) {
        this.organizationType = payload
    }
    errors: IregistrationErrors = {
        PasswordError: false,
        UserNameError: false,
    }
    auth = new AuthService()

    logIn() {
        this.$store.dispatch('auth/login')
        this.$store.dispatch('auth/toggleRegistration')
    }

    handleError(errorMessages?: string[]) {
        for (const key in this.errors) {
            this.errors[key] = false
        }
        if (errorMessages) {
            errorMessages.forEach(errorMsg => {
                this.errors[errorMsg] = true
                if (errorMsg.includes('Password')) {
                    this.errors.PasswordError = true
                } else {
                    this.errors.PasswordError = false
                }
                if (errorMsg.includes('UserName')) {
                    this.errors.UserEmailError = true
                } else {
                    this.errors.UserEmailError = false
                }
            })
        }

        const userNameRegExp = /^[a-zA-Zа-яА-я]+$/
        const userPhoneRegExp = /^\d{11}$/
        const OrganizationNameRegExpg = /^[^<>?[\]:|*']+$/

        if (!userNameRegExp.test(this.userName)) {
            this.errors.UserNameError = true
        }
        if (!userNameRegExp.test(this.userLastName)) {
            this.errors.UserLastNameError = true
        }
        if (!userNameRegExp.test(this.userPatronymic) && this.userPatronymic !== '') {
            this.errors.UserPatronymicNameError = true
        }
        if (!OrganizationNameRegExpg.test(this.organizationName)) {
            this.errors.OrganizationNameError = true
        }
        this.errors.UserPhoneError = !userPhoneRegExp.test(this.regForm.phone)
        this.$forceUpdate()
    }

    fieldValidity() {
        const errors = this.errors

        for (const key in errors) {
            if (errors.hasOwnProperty(key)) {
                if (errors[key] === true) {
                    return false
                }
            }
        }

        return true
    }
    get svgShowPasswordComponent() {
        return this.passwordVisibility ? 'svg-eye-visible' : 'svg-eye-hidden'
    }

    onSubmit(e: Event) {
        this.handleError()
        if (this.fieldValidity()) {
            this.loadingForm = true
            this.auth
                .registration(this.regForm)
                .then(res => {
                    this.loadingForm = false
                    store.dispatch('auth/login')
                    store.dispatch('display/toggleRegistration')
                })
                .catch(err => {
                    this.loadingForm = false
                    const errorMessages = (((err || []).response || []).data || []) as string
                    const errorMessagesArr = errorMessages.split(' ')

                    this.handleError(errorMessagesArr)
                })
        }
    }
    changePasswordVisibility() {
        this.passwordVisibility = !this.passwordVisibility
        const passwordInput = this.$refs.passwordInput as HTMLInputElement
        passwordInput.focus()
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text'
        } else {
            passwordInput.type = 'password'
        }
        setTimeout(() => {
            passwordInput.setSelectionRange(this.password.length, this.password.length)
        }, 0)
    }
}
</script>

<style lang="scss" src="./registration-form-styles.scss"></style>
