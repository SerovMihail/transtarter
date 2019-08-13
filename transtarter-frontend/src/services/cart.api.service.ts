import axios from '@/services/axios.service'
export interface ICartService {
    getCart(): Promise<any>
    addToCart(
        crossGroupId: number,
        number: string,
        amount: number,
        viewId: string,
        warehouseId: number
    ): Promise<any>
    removeFromCart(id: number): Promise<any>
    removeOrdersFromCart(orderIds: number[]): any
    getCartInfo(): Promise<any>
}
export class CartApiService implements ICartService {
    public getCart() {
        return axios.get('/api/ts/Carts')
    }
    public addToCart(
        crossGroupId: number,
        number: string,
        amount: number,
        viewId: string,
        warehouseId: number
    ) {
        return axios.post('/api/ts/carts/items', {
            crossGroupId,
            number,
            amount,
            viewId,
            warehouseId,
        })
    }
    removeFromCart(id: number) {
        return axios.delete(`/api/ts/carts/items/${id}`)
    }
    async removeOrdersFromCart(orderIds: number[]) {
        for (const item of orderIds) {
            await this.removeFromCart(item)
        }
    }
    getCartInfo() {
        return axios.get(`/api/ts/Carts/info`)
    }
    sendOrder(order: any) {
        return axios.post('/api/Orders', order)
    }
}
