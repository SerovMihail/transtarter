import { IProduct } from "./../IProduct";
export interface IFavouriteWithProductsResultDTO {
    id: number;
    createDateTime: string;
    brand: string;
    number: string;
    partnerId: number;
    product: IProduct;
}
export interface IFavouriteWithProductsDTO {
    totalCount: number;
    result: IFavouriteWithProductsResultDTO[];
}
