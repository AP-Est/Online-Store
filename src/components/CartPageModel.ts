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
    onChangeModel!: CallableFunction;

    constructor() {
        _notANull();
        this.cartLots = JSON.parse(localStorage.cart) || [];
        this.storeData = storeData;
        this.products = storeData.products;
    }
    bindPushToLocalStorage(productId: number) {
        pushToLocalStorage(productId);
    }
    handleCardItemIncrement(productId: number) {
        //cardItemIncrement(productId);
        this.cartLots.forEach((obj) => {
            if (obj.id === productId) {
                obj.count += 1;
            }
            return obj;
        });

        this.commit(this.cartLots, this.products);
    }
    handleCardItemDecrement(productId: number) {
        const _tempArray = this.cartLots
            .map((obj) => {
                if (obj.id === productId) {
                    if (obj.count > 1) {
                        obj.count -= 1;
                    } else {
                        return '';
                    }
                }
                return obj;
            })
            .filter((obj) => {
                return obj !== '';
            });
        this.cartLots = _tempArray as ICartLot[];
        this.commit(this.cartLots, this.products);
    }

    bindGetCartItems() {
        getCartItems();
    }
    bindChangeModel(callback: CallableFunction) {
        this.onChangeModel = callback;
    }
    commit(cartLots: ICartLot[], products: IProduct[]) {
        this.onChangeModel(cartLots, products);
        localStorage.cart = JSON.stringify(cartLots);
    }
}
