export interface IFavouriteDto {
    totalCount: number;
    result: {
        id: number;
        createDateTime: string;
        brand: string;
        number: string;
        partnerId: number;
    }[];
}
