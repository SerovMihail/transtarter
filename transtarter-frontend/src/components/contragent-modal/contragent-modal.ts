import { Vue, Component, Prop } from 'vue-property-decorator'
import cookieStorage from 'cookie-storage-domain'
import axios from 'axios'
import { store } from '@/store/'
import { DisplayModule } from '@/store/modules/display.module'
import { AuthModule } from '@/store/modules/authentication.module'
import AppBtn from '@/components/core-ui/app-btn.vue'
import AppModal from '@/components/core-ui/app-modal/app-modal'
@Component({
    components: { AppBtn, AppModal },
})
class ContragentModal extends Vue {
    @Prop(Boolean) readonly cancelControls!: boolean
    @Prop(Boolean) readonly forLogin!: number
    private readonly identityApi: string = process.env.VUE_APP_IDENTITY_SERVER_API || ''

    isLoading: boolean = false

    get contragentOpen() {
        return DisplayModule.showPopup.changeContrAgent
    }
    get contragentOptions() {
        return AuthModule.userContragents
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
    async dispatchContragent(contrAgent: any) {
        if (!this.forLogin) {
            try {
                const { data } = await axios.get(
                    `${this.identityApi}/api/Account/partner/${contrAgent.id}`
                )

                store.dispatch('auth/updatePartnerCredentials', data)
                store.dispatch('auth/updateContrAgent', contrAgent)
                store.dispatch('display/toggleContrAgentModal')

                this.$emit('contragentWasChosen', contrAgent.id)
            } catch (err) {
                console.log(err)
            }
        }
    }

    private keyboardEscHandler(e: any) {
        if (e.keyCode === 27 && this.contragentOpen) {
            this.onClose()
        }
    }
    onClose() {
        store.dispatch('display/toggleContrAgentModal')
    }
}
export default ContragentModal
