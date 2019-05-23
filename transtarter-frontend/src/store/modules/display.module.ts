import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'
import { store } from '../index'

export interface IDisplayState {
    showPopup: {
        registration: boolean
        // logIn: boolean,
        restorePassword: boolean
        successRestore: boolean
        requestCall: boolean
        changeContrAgent: boolean
    }

    showBlock: {
        selectCity: boolean
        yourCity: boolean
    }

    blocksShow: {
        menu: boolean
        location: boolean
        user: boolean
    }
}

@Module({ dynamic: true, store, name: 'display', namespaced: true })
export class Display extends VuexModule implements IDisplayState {
    windowDocument = document
    popupIsOpenedClassName = 'modal-open'

    showPopup = {
        registration: false,
        // logIn: false,
        restorePassword: false,
        successRestore: false,
        requestCall: false,
        changeContrAgent: false,
    }
    showBlock = {
        selectCity: false,
        yourCity: false,
    }

    blocksShow = {
        menu: false,
        location: false,
        user: false,
    }

    @Action
    checkPopupIsOpened() {
        const keys = Object.values(this.showPopup)
        if (keys.some(x => x === true)) {
            this.windowDocument.body.classList.add(this.popupIsOpenedClassName)
            if (this.windowDocument.documentElement) {
                this.windowDocument.documentElement.classList.add(this.popupIsOpenedClassName)
            }
        } else {
            this.windowDocument.body.classList.remove(this.popupIsOpenedClassName)
            if (this.windowDocument.documentElement) {
                this.windowDocument.documentElement.classList.remove(this.popupIsOpenedClassName)
            }
        }
    }

    @Mutation
    TOGGLE_YOUR_CITY() {
        this.showBlock.yourCity = !this.showBlock.yourCity
    }

    @Action
    public toggleYourCity(): void {
        this.context.commit('TOGGLE_YOUR_CITY')
        this.checkPopupIsOpened()
    }

    @Mutation
    TOGGLE_YOUR_CITY_AND_OPEN_SELECT_CITY() {
        this.showBlock.yourCity = false
        this.showBlock.selectCity = true
    }

    @Action
    public toggleYourCityAndOpenSelectCity(): void {
        this.context.commit('TOGGLE_YOUR_CITY_AND_OPEN_SELECT_CITY')
        this.checkPopupIsOpened()
    }

    @Mutation
    TOGGLE_SELECT_CITY_AND_SELECT_CITY(cityName: string) {
        this.showBlock.selectCity = false
        // TO DO SAVE CITY
    }

    @Action
    public toggleSelectCity(sityName: string): void {
        this.context.commit('TOGGLE_SELECT_CITY_AND_SELECT_CITY')
        this.checkPopupIsOpened()
    }

    @Mutation
    TOGGLE_REQUEST_CALL() {
        this.showPopup.requestCall = !this.showPopup.requestCall
    }

    @Action
    public toggleRequest(): void {
        this.context.commit('TOGGLE_REQUEST_CALL')
        this.checkPopupIsOpened()
    }

    @Mutation
    CLOSE_LOG_IN_AND_OPEN_SUCCESS_REGISTRATION() {
        this.showPopup.restorePassword = false
        this.showPopup.successRestore = true
    }

    @Action
    public closeLogInAndOpenSuccessRegistration(): void {
        this.context.commit('CLOSE_LOG_IN_AND_OPEN_SUCCESS_REGISTRATION')
        this.checkPopupIsOpened()
    }

    @Mutation
    TOGGLE_RESTORE() {
        this.showPopup.restorePassword = !this.showPopup.restorePassword
    }

    @Action
    public toggleRestore(): void {
        this.context.commit('TOGGLE_RESTORE')
        this.checkPopupIsOpened()
    }

    @Mutation
    TOGGLE_SUCCESS_RESTORE() {
        this.showPopup.successRestore = !this.showPopup.successRestore
    }

    @Action
    public toggleSuccessRestore(): void {
        this.context.commit('TOGGLE_SUCCESS_RESTORE')
        this.checkPopupIsOpened()
    }

    @Mutation
    TOGGLE_REGISTRATION() {
        this.showPopup.registration = !this.showPopup.registration
    }

    @Action
    public toggleRegistration(): void {
        this.context.commit('TOGGLE_REGISTRATION')
        this.checkPopupIsOpened()
    }

    @Mutation
    TOGGLE_BLOCK_SHOW_MENU() {
        this.blocksShow.menu = !this.blocksShow.menu
    }

    @Action
    public toggleBlockShowMenu(): void {
        this.context.commit('TOGGLE_BLOCK_SHOW_MENU')
    }

    @Mutation
    TOGGLE_BLOCK_SHOW_USER() {
        this.blocksShow.user = !this.blocksShow.user
    }

    @Action
    public toggleBlockShowUser(): void {
        this.context.commit('TOGGLE_BLOCK_SHOW_USER')
    }

    @Mutation
    HIDE_BLOCK_SHOW_MENU() {
        this.blocksShow.menu = false
    }

    @Action
    public hideBlockShowMenu(): void {
        this.context.commit('HIDE_BLOCK_SHOW_MENU')
    }

    @Mutation
    HIDE_BLOCK_SHOW_USER() {
        this.blocksShow.user = false
    }

    @Action
    public hideBlockShowUser(): void {
        this.context.commit('HIDE_BLOCK_SHOW_USER')
    }
    @Mutation
    TOGGLE_CONTR_AGENT_MODAL() {
        this.showPopup.changeContrAgent = !this.showPopup.changeContrAgent
    }
    @Action
    toggleContrAgentModal() {
        this.context.commit('TOGGLE_CONTR_AGENT_MODAL')
    }
}

export const DisplayModule = getModule(Display, store)
