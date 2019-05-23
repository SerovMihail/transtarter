import { Vue, Component, Prop } from 'vue-property-decorator'
import cookieStorage from 'cookie-storage-domain'
import axios from 'axios'
import { store } from '@/store/'
@Component({})
class ContragentModal extends Vue {
    @Prop(Boolean) readonly cancelControls!: boolean
    @Prop(Boolean) readonly forLogin!: number
    private readonly identityApi: string = process.env.VUE_APP_IDENTITY_SERVER_API || ''
    get contragentOpen() {
        return this.$store.state.display.showPopup.changeContrAgent
    }
    get contragentOptions() {
        return this.$store.state.authentication.userContragents
    }
    private keyboardEscHandler(e: any) {
        if (e.keyCode === 27 && this.contragentOpen) {
            this.closeModal()
        }
    }
    closeModal() {
        this.$store.dispatch('display/toggleContrAgentModal')
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
        store.dispatch('authentication/updateContrAgent', contrAgent)
        store.dispatch('display/toggleContrAgentModal')
        cookieStorage.setItem('selected-contragent', contrAgent)
        this.$emit('contragentWasChosen', contrAgent.id)
    }
}
export default ContragentModal
