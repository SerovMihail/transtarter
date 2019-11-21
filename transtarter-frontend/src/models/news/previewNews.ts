import { IPreviewNewsItem } from "./";
export interface IPreviewNews {
    items: IPreviewNewsItem[];
    pages: {
        /** Номер текущей страницы постраничной навигации */
        NavPageNomer: number;
        /**  Количество страниц */
        NavPageCount: number;
    };
}
