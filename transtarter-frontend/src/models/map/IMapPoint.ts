export interface IMapPoint {
    coords: number[]
    info: {
        company: string
        address: string
        phones: string[] | string
        website: string
        city: string
    }
}
