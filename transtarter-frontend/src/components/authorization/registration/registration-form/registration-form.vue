<template>
    <div class="registration-container">
        <div v-if="loadingForm" class="loading-wrapper"></div>
        <div class="registration-text">
            Регистрация
        </div>
        <form class="registration-form" @submit.prevent="onSubmit">
            <spinner v-if="loadingForm" class="spinner" />
            <div class="form-group">
                <label class="label">Введите email</label>
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
                <label class="label">Введите пароль</label>
                <input
                    v-model.trim="password"
                    placeholder="Пароль"
                    class="form-control password-input"
                    type="password"
                    required
                    utocomplete="new-password"
                    :class="{ 'invalid-input': errors.PasswordError }"
                />
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
                <label class="label">Введите имя контактного лица</label>
                <input
                    v-model.trim="userName"
                    placeholder="Имя"
                    class="form-control name-input"
                    type="text"
                    required
                    :class="{ 'invalid-input': errors.UserNameError }"
                />
                <div v-if="errors.UserNameError" class="invalid-text">
                    В имени пользователя нельзя использовать пробелы и специальные символы ($#!).
                </div>
            </div>
            <div class="form-group">
                <label class="label">Введите фамилию контактного лица</label>
                <input
                    v-model.trim="userLastName"
                    placeholder="Фамилия"
                    class="form-control name-input"
                    type="text"
                    required
                    :class="{ 'invalid-input': errors.UserLastNameError }"
                />
                <div v-if="errors.UserLastNameError" class="invalid-text">
                    В фамилии пользователя нельзя использовать пробелы и специальные символы ($#!).
                </div>
            </div>
            <div class="form-group">
                <label class="label">Введите отчество контактного лица</label>
                <input
                    v-model.trim="userPatronymic"
                    placeholder="Отчество"
                    class="form-control name-input"
                    type="text"
                    required
                    :class="{ 'invalid-input': errors.UserPatronymicNameError }"
                />
                <div v-if="errors.UserPatronymicNameError" class="invalid-text">
                    В отчестве пользователя нельзя использовать пробелы, цифры и специальные символы
                    ($#!).
                </div>
            </div>

            <div class="form-group">
                <label class="label">Введите телефон</label>
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

            <!-- <div class="form-group">
                <label class="label">Какую организацию вы представляете?</label>

                <app-select
                    :options="organizationVariants"
                    :selected="organizationVariant"
                    @updateOption="changeOrganizationVariant"
                />
            </div> -->

            <div class="form-group">
                <label class="label">Введите наименование организации</label>
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
                        placeholder="Название огранизации"
                        class="form-control second-selector"
                        type="text"
                        required
                    />
                </div>
            </div>

            <button type="submit" class="btn btn-yellow btn-reg">Зарегистрироваться</button>

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
import { VueMaskDirective } from 'v-mask'
import Spinner from '@/components/spinner/spinner.vue'
import AppSelect from '@/components/core-ui/app-select/app-select'
import { store } from '@/store'
Vue.directive('mask', VueMaskDirective)

@Component({
    components: { Spinner, AppSelect },
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
            // organizationVariant: "Автосервис",
            companyName: this.organizationName + ' ' + this.organizationType.name,
        }
    }

    organizationTypes = [
        { name: 'ООО' },
        { name: 'ИП' },
        { name: 'Частное лицо' },
        { name: 'Другое' },
    ]
    loadingForm = false
    userName = ''
    userLastName = ''
    userPatronymic = ''
    phone = ''
    email = ''
    password = ''
    organizationName = ''
    organizationType = { name: 'OOO' }
    // organizationVariants = [{ name: "Автосервис" }, { name: "Частное лицо" }];
    // organizationVariant = { name: "Автосервис" };
    changeOption(payload: any) {
        this.organizationType = payload
    }
    // changeOrganizationVariant(payload: any) {
    //     this.organizationVariant = payload;
    // }
    errors: IregistrationErrors = {
        PasswordError: false,
        UserNameError: false,
    }
    auth = new AuthService()

    logIn() {
        this.$store.dispatch('authentication/login')
        this.$store.dispatch('authentication/toggleRegistration')
    }

    handleError(errorMessages: string[]) {
        for (const key in this.errors) {
            this.errors[key] = false
        }
        errorMessages.forEach(errorMsg => {
            this.errors[errorMsg] = true
            if (errorMsg.includes('Password')) {
                this.errors.PasswordError = true
            }
            if (errorMsg.includes('UserName')) {
                this.errors.UserEmailError = true
            }
        })

        const userNameRegExp = /^[a-zA-Zа-яА-я]+$/
        const userPhoneRegExp = /^\d{11}$/

        if (!userNameRegExp.test(this.userName)) {
            this.errors.UserNameError = true
        }
        if (!userNameRegExp.test(this.userLastName)) {
            this.errors.UserLastNameError = true
        }
        if (!userNameRegExp.test(this.userPatronymic)) {
            this.errors.UserPatronymicNameError = true
        }
        this.errors.UserPhoneError = !userPhoneRegExp.test(this.regForm.phone)
        this.$forceUpdate()
    }

    onSubmit(e: Event) {
        this.loadingForm = true
        this.auth
            .registration(this.regForm)
            .then(res => {
                this.loadingForm = false
                store.dispatch('authentication/login')
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
</script>

<style lang="scss" src="./registration-form-styles.scss"></style>
