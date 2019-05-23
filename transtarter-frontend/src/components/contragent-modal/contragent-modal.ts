import { Vue, Component, Prop } from 'vue-property-decorator'
import cookieStorage from 'cookie-storage-domain'
import axios from 'axios'
import { store } from '@/store/'
import { DisplayModule } from '@/store/modules/display.module'
import { AuthModule } from '@/store/modules/authentication.module'
import AppBtn from '@/components/core-ui/app-btn.vue'
@Component({
    components: { AppBtn },
})
class ContragentModal extends Vue {
    @Prop(Boolean) readonly cancelControls!: boolean
    @Prop(Boolean) readonly forLogin!: number
    private readonly identityApi: string = process.env.VUE_APP_IDENTITY_SERVER_API || ''
    get contragentOpen() {
        return DisplayModule.showPopup.changeContrAgent
    }
    get contragentOptions() {
        return AuthModule.userContragents
    }
    private keyboardEscHandler(e: any) {
        if (e.keyCode === 27 && this.contragentOpen) {
            this.closeModal()
        }
    }
    closeModal() {
        store.dispatch('display/toggleContrAgentModal')
    }
    mounted() {
        if (!this.cancelControls) {
            document.addEventListener('keyup', this.keyboardEscHandler)
        }
    }
    created() {}
    destroyed() {
        document.removeEventListener('keyup', this.keyboardEscHandler)
    }
    dispatchContragent(contrAgent: any) {
        if (!this.forLogin) {
            axios.get(`${this.identityApi}/api/Account/partner/${contrAgent.id}`).then(result => {
                cookieStorage.setItem('ts-user', JSON.stringify(result.data))
            })
        }
        store.dispatch('auth/updateContrAgent', contrAgent)
        store.dispatch('display/toggleContrAgentModal')
        cookieStorage.setItem('selected-contragent', contrAgent)
        this.$emit('contragentWasChosen', contrAgent.id)
    }
}
export default ContragentModal
