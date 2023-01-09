import { ICartLot } from '../styles/types';

export class BaseModel {
    totalCost: string;
    cartCount: string;
    cartLots: ICartLot[];
    onChangeModel!: CallableFunction;

    constructor() {
        this.totalCost = '';
        this.cartCount = '';
        this.cartLots = JSON.parse(localStorage.cart) || [];
        this.getData();
    }
    private getData() {
        const count = () => {
            return this.cartLots.reduce((acc, obj) => acc + obj.count, 0);
        };
        const priceTotal = () => {
            return this.cartLots.reduce((acc, obj) => acc + obj.price * obj.count, 0);
        };
        this.totalCost = String(priceTotal());
        this.cartCount = String(count());
    }
    bindChangeModel(callback: CallableFunction) {
        this.onChangeModel = callback;
    }
    private commit() {
        this.onChangeModel(this.totalCost, this.cartCount);
    }
    handleUpdateData() {
        this.commit();
    }
}
