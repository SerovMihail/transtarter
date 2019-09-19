import { IPartnerRestrictions } from './IPartnerRestrictions'

export interface IPartner {
    id: number
    name: string
    currencyShortName: string
    priceTypeName: string
    priceTypeShortName: string
    defaultAgentId: string
    defaultAgentContractNumber: string
    defaultAgentContractDate: string
    balance: number
    restrictions: IPartnerRestrictions
}
