import { Vue, Component } from 'vue-property-decorator'
import { DisplayModule } from '@/store/modules/display.module'
import { store } from '@/store/index'
import { AuthModule } from '@/store/modules/authentication.module'
import AppModal from '@/components/core-ui/app-modal/app-modal'

@Component({
    components: { AppModal },
})
class contragentRestrictionModal extends Vue {
    get modalStatus() {
        return DisplayModule.showPopup.contragentRestrictionModal
    }
    set modalStatus(value) {
        store.dispatch('display/setContragentRestrictionModal', value)
    }
    get restrictionMessage() {
        if (this.isCreditOverflow && this.isDurationOverflow) {
            return 'превышен срок и сумма кредита.'
        } else if (this.isCreditOverflow) {
            return 'превышена сумма кредита.'
        } else if (this.isDurationOverflow) {
            return 'превышен срок кредита.'
        }
    }
    get isCreditOverflow() {
        if (AuthModule.partnerProfile && AuthModule.partnerProfile.restrictions) {
            return AuthModule.partnerProfile.restrictions.isCreditOverflow
        }
    }
    get isDurationOverflow() {
        if (AuthModule.partnerProfile && AuthModule.partnerProfile.restrictions) {
            return AuthModule.partnerProfile.restrictions.isDurationOverflow
        }
    }
    get isOrderingDisabled() {
        return AuthModule.isOrderingDisabled
    }
}
export default contragentRestrictionModal
