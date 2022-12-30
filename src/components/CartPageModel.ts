import { IProduct, IStoreData, storeData } from '../data/data';
import pushToLocalStorage from '../utils/pushToLocalStorage';
import getCartItems from '../utils/getCartItems';
import { ICartLot } from '../styles/types';
import cardItemIncrement from '../utils/cardItemIncrement';
import cardItemDecrement from '../utils/cardItemDecrement';
import _notANull from '../utils/notANull';
export class CartPageModel {
    products: IProduct[];
    cartLots: ICartLot[];
    storeData: IStoreData;
    onChangeModel: any;

    constructor() {
        _notANull();
        this.cartLots = JSON.parse(localStorage.cart) || [];
        this.storeData = storeData;
        this.products = storeData.products;
    }
    // pushToLocalStorage() {}
    // delFromLocalStorage() {}

    // cardItemIncrement() {}
    // cardItemDecrement() {}
    // notANull() {}
    // getCartItems() {}
    bindPushToLocalStorage(productId: number) {
        pushToLocalStorage(productId);
    }
    handleCardItemIncrement(productId: number) {
        this.cartLots.map((obj) => {
            if (obj.id === productId) {
                obj.count += 1;
            }
            return obj;
        });

        this.commit(this.cartLots);
    }
    handleCardItemDecrement(productId: number) {
        cardItemDecrement(productId);
    }

    bindGetCartItems() {
        getCartItems();
    }
    bindChangeModel(callback: any) {
        this.onChangeModel = callback;
        console.log('callback =======', callback);
    }
    commit(cartLots: ICartLot[]) {
        this.onChangeModel(cartLots);
        localStorage.cart = JSON.stringify(cartLots);
    }

    // }
}
