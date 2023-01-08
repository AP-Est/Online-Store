import { storeData } from '../data/data';
import { ICartLot, IProduct, IStoreData } from '../styles/types';

export class DetailPageModel {
    cartLots: ICartLot[];
    storeData!: IStoreData;
    products!: IProduct[];
    onChangeModel!: CallableFunction;

    constructor() {
        this.cartLots = JSON.parse(localStorage.cart) || [];
        this.storeData = storeData;
    }

    bindChangeModel(callback: CallableFunction) {
        this.onChangeModel = callback;
    }
    private commit() {
        this.onChangeModel(this.storeData);
    }

    handlePushToLocalStorage(itemId: number) {
        const storageObject: ICartLot = {
            id: itemId,
            count: 1,
            price: this.storeData.products[itemId - 1].price,
        };
        if (!localStorage.getItem('cart')) {
            const storageArray: ICartLot[] = [storageObject];
            localStorage.setItem('cart', JSON.stringify(storageArray));
        } else {
            const storageArray: ICartLot[] = JSON.parse(localStorage.cart);
            storageArray.push(storageObject);
            localStorage.cart = JSON.stringify(storageArray);
        }
        this.commit();
    }
    handleDropFromLocalStorage(itemId: number) {
        const storageArray: ICartLot[] = JSON.parse(localStorage.cart);
        localStorage.cart = JSON.stringify(storageArray.filter((obj) => obj.id !== itemId));
        this.commit();
    }
}
