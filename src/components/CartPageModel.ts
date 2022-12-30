import { IProduct, IStoreData, storeData } from '../data/data';
import pushToLocalStorage from '../utils/pushToLocalStorage';
import getCartItems from '../utils/getCartItems';
import { ICartLots } from '../styles/types';
import cardItemIncrement from '../utils/cardItemIncrement';
import cardItemDecrement from '../utils/cardItemDecrement';
import _notANull from '../utils/notANull';
export class CartPageModel {
    products: IProduct[];
    cartData: ICartLots[];
    storeData: IStoreData;
    onChangeModel: any;

    constructor() {
        _notANull();
        this.cartData = JSON.parse(localStorage.cart) || [];
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
        cardItemIncrement(productId);
        //this.bindUpdateCartBody('cartBody');
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
    bindUpdateCartBody(block: string) {
        this.onChangeModel(block);
    }
}
