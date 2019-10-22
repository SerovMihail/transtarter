export interface IProduct {
    brand: string
    number: string
    groupId: number
    shortDescription: string

    alreadyInBucket?: number
    display?: boolean

    usage?: any[]
    availableItems?: any[]
}
