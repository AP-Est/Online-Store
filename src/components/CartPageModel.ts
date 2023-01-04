import { IProduct, IStoreData, storeData } from '../data/data';
import pushToLocalStorage from '../utils/pushToLocalStorage';
import getCartItems from '../utils/getCartItems';
import { ICartLot, ICode, IPlug, ISumm } from '../styles/types';
import _notANull from '../utils/notANull';
export class CartPageModel {
    products: IProduct[];
    cartLots: ICartLot[];
    cartView: ICartLot[];
    storeData: IStoreData;
    onChangeModel!: CallableFunction;
    plug: IPlug;
    summaryVars: ISumm;
    AvailableCodes: ICode[];

    constructor() {
        _notANull();
        this.AvailableCodes = [
            { title: 'AN', description: 'Andrey`s code', discount: 10 },
            { title: 'NA', description: 'Nat`s code', discount: 10 },
        ];
        this.plug = {
            limit: 3,
            page: 1,
            startNumberID: 1,
        };
        this.summaryVars = {
            countItems: 0,
            priceTotal: 0,
            priceWithCodes: 0,
            codes: [
                { title: 'AN', description: 'Andrey`s code', discount: 10 },
                { title: 'NA', description: 'Nat`s code', discount: 10 },
            ],
        };
        this._getStartNumber(this.plug);
        this.cartLots = JSON.parse(localStorage.cart) || [];
        this.cartView = [];
        this._getCartView(this.plug);
        this._getSummaryVars();
        this.storeData = storeData;
        this.products = storeData.products;
        //this.updateURL();
    }
    bindChangeModel(callback: CallableFunction) {
        this.onChangeModel = callback;
    }
    commit(cartLots: ICartLot[], products: IProduct[]) {
        this._getStartNumber(this.plug);
        this._getCartView(this.plug);
        this._checkEmptyArray();
        localStorage.cart = JSON.stringify(cartLots);
        this.onChangeModel(this.cartView, products, this.plug, this.summaryVars);
    }
    _getCartView = (plug: IPlug) => {
        if (this.cartLots.length > plug.limit) {
            this.cartView = this.cartLots.slice((plug.page - 1) * plug.limit, plug.page * plug.limit);
        } else this.cartView = this.cartLots;
    };
    _getStartNumber = (plug: IPlug) => {
        this.plug.startNumberID = plug.page * plug.limit - plug.limit + 1;
    };

    _checkEmptyArray = () => {
        if (this.cartLots !== undefined && this.cartLots.length !== 0) {
            while (this.cartView.length === 0) {
                this.plug.page -= 1;
                this._getCartView(this.plug);
            }
        }
    };
    _getSummaryVars = () => {
        const count = () => {
            return this.cartLots.reduce((acc, obj) => acc + obj.count, 0);
        };
        const priceTotal = () => {
            return this.cartLots.reduce((acc, obj) => acc + obj.price * obj.count, 0);
        };
        const priceWithCodes = () => {
            return priceTotal() * (100 - this._discountSummary()) * 0.01;
        };

        this.summaryVars.countItems = count();
        this.summaryVars.priceTotal = priceTotal();
        this.summaryVars.priceWithCodes = priceWithCodes();
    };
    _discountSummary = () => {
        const arr: ICode[] = this.summaryVars.codes;
        if (arr.length > 0) {
            return arr.reduce((acc, obj) => acc + obj.discount, 0);
        } else return 0;
    };
    // updateURL() {
    //     if (history.pushState) {
    //         const baseUrl = window.location;
    //         const newUrl = baseUrl + `?limit:${this.plug.limit}&page:${this.plug.page}`;
    //         history.pushState(null, 'null', newUrl);
    //     } else {
    //         console.warn('History API не поддерживается');
    //     }
    // }

    handleCardItemIncrement(productId: number) {
        let maxCount: number;
        this.products.forEach((obj) => {
            if (obj.id === productId) {
                maxCount = obj.stock;
            }
        });
        this.cartLots.forEach((obj) => {
            if (obj.id === productId && obj.count < maxCount) {
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
        if (this.cartView.length === 1) {
            this.plug.page -= 1;
        }
        this.cartLots = _tempArray as ICartLot[];
        this.commit(this.cartLots, this.products);
    }

    bindGetCartItems() {
        getCartItems();
    }
    handlePageIncrement() {
        if (this.cartLots.length > this.plug.page * this.plug.limit) {
            this.plug.page += 1;
        }
        this.commit(this.cartLots, this.products);
    }

    handlePageDecrement() {
        if (this.plug.page > 1) {
            this.plug.page -= 1;
        }
        this.commit(this.cartLots, this.products);
    }
    handleLimitChanged(limit: number) {
        this.plug.limit = limit;
        if (this.cartLots.length <= this.plug.limit) {
            if (this.plug.page > 1) {
                this.plug.page -= 1;
            }
        }
        this.commit(this.cartLots, this.products);
    }
}
