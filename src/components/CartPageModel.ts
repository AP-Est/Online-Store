import { IProduct, IStoreData, storeData } from '../data/data';
import pushToLocalStorage from '../utils/pushToLocalStorage';
import getCartItems from '../utils/getCartItems';
import { ICartLot, IPlug } from '../styles/types';
import _notANull from '../utils/notANull';
export class CartPageModel {
    products: IProduct[];
    cartLots: ICartLot[];
    cartView: ICartLot[];
    storeData: IStoreData;
    onChangeModel!: CallableFunction;
    plug: IPlug;

    constructor() {
        _notANull();
        this.plug = {
            limit: 3,
            page: 1,
        };
        this.cartLots = JSON.parse(localStorage.cart) || [];
        this.cartView = [];
        this._getCartView(this.plug);
        this.storeData = storeData;
        this.products = storeData.products;
    }
    bindChangeModel(callback: CallableFunction) {
        this.onChangeModel = callback;
    }
    commit(cartLots: ICartLot[], products: IProduct[]) {
        localStorage.cart = JSON.stringify(cartLots);
        this.onChangeModel(this.cartView, products, this.plug);
    }
    _getCartView = (plug: IPlug) => {
        if (this.cartLots.length > plug.limit) {
            this.cartView = this.cartLots.slice((plug.page - 1) * plug.limit, plug.page * plug.limit);
        } else this.cartView = this.cartLots;
    };

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
    handlePageIncrement() {
        if (this.cartLots.length > this.plug.page * this.plug.limit) {
            this.plug.page += 1;
            console.log('plus', this.plug.page);
        }
        this._getCartView(this.plug);
        this.commit(this.cartLots, this.products);
    }

    handlePageDecrement() {
        if (this.plug.page > 1) {
            this.plug.page -= 1;
            console.log('min', this.plug.page);
        }
        this._getCartView(this.plug);
        this.commit(this.cartLots, this.products);
    }
    handleLimitChanged(limit: number) {
        this.plug.limit = limit;
        this._getCartView(this.plug);
        this.commit(this.cartLots, this.products);
    }
}
