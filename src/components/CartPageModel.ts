import { IProduct, IStoreData, storeData } from '../data/data';
import getCartItems from '../utils/getCartItems';
import { ICartLot, ICode, IModalData, IPlug, ISumm } from '../styles/types';
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
    modalDate: IModalData;

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
                { title: 'AN', description: 'Andrey`s code - 10% - ', discount: 10 },
                { title: 'NA', description: 'Nat`s    code - 10% - ', discount: 10 },
            ],
        };
        this.modalDate = {
            state: false,
            error: {
                name: false,
                phone: false,
                address: false,
                mail: false,
                cardNumber: false,
                cardValid: false,
                cardCVV: false,
            },
            name: '',
            phone: '',
            address: '',
            mail: '',
            cardNumber: '',
            cardType:
                'https://i.guim.co.uk/img/media/b73cc57cb1d46ae742efd06b6c58805e8600d482/16_0_2443_1466/master/2443.jpg?width=700&quality=85&auto=format&fit=max&s=fb1dca6cdd4589cd9ef2fc941935de71',
            cardValid: '',
            cardCVV: NaN,
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
        this._getSummaryVars();
        this._getStartNumber(this.plug);
        this._getCartView(this.plug);
        this._checkEmptyArray();
        localStorage.cart = JSON.stringify(cartLots);
        this.onChangeModel(this.cartView, products, this.plug, this.summaryVars, this.modalDate);
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
            return (priceTotal() * (100 - this._discountSummary()) * 0.01).toFixed(2);
        };

        this.summaryVars.countItems = count();
        this.summaryVars.priceTotal = priceTotal();
        this.summaryVars.priceWithCodes = +priceWithCodes();
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
    handleCodeEntrances(codeValue: string) {
        let check = true;
        this.summaryVars.codes.map((val) => {
            if (val.title === codeValue) {
                check = false;
            }
        });
        if (check == true) {
            this.AvailableCodes.map((obj) => {
                if (obj.title === codeValue) {
                    this.summaryVars.codes.push(obj);
                }
            });
        }
        this.commit(this.cartLots, this.products);
    }
    handleCodeDrop(dropTitle: string) {
        this.summaryVars.codes = this.summaryVars.codes.filter((val) => {
            if (val.title !== dropTitle) {
                return val;
            }
        });
        this.commit(this.cartLots, this.products);
    }
    handleOpenModalWindow() {
        this.modalDate.state = true;
        this.commit(this.cartLots, this.products);
    }
    handleCloseModalWindow() {
        this.modalDate.state = false;
        this.commit(this.cartLots, this.products);
    }
    //todo
    handleName(value: string) {
        const letters = /^[A-Za-z]+\s[A-Za-z]+$/;
        this.modalDate.name = value;
        if (letters.test(value)) {
            this.modalDate.error.name = false;
        } else {
            this.modalDate.error.name = true;
        }
        this.commit(this.cartLots, this.products);
    }
    handlePhone(value: string) {
        const numbers = /[+]+[0-9]{9,}/;
        this.modalDate.phone = value;
        if (numbers.test(value)) {
            this.modalDate.error.phone = false;
        } else {
            this.modalDate.error.phone = true;
        }
        this.commit(this.cartLots, this.products);
    }
    handleAddress(value: string) {
        const letters = /[0-9a-zA-Z,.]+\s[0-9a-zA-Z,.]+\s[0-9a-zA-Z,.]+$/;
        this.modalDate.address = value;
        if (letters.test(value)) {
            this.modalDate.error.address = false;
        } else {
            this.modalDate.error.address = true;
        }
        this.commit(this.cartLots, this.products);
    }
    handleMail(value: string) {
        const letters = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
        this.modalDate.mail = value;
        if (letters.test(value)) {
            this.modalDate.error.mail = false;
        } else {
            this.modalDate.error.mail = true;
        }
        this.commit(this.cartLots, this.products);
    }
    handleCardNumber(value: string) {
        const letters = /\d{4}([-]|\s|)\d{4}([-]|\s|)\d{4}([-]|\s|)\d{4}/;
        this.modalDate.cardNumber = value;
        switch (value[0]) {
            case '4':
                this.modalDate.cardType = 'https://cdn.visa.com/v2/assets/images/logos/visa/blue/logo.png';
                break;
            case '5':
                this.modalDate.cardType =
                    'https://www.mastercard.hu/content/dam/public/mastercardcom/eu/hu/images/mc-logo-52.svg';
                break;
            case '6':
                this.modalDate.cardType = 'https://m.unionpayintl.com/imp_file/global/wap/en/static/images/logo.png';
                break;
            case '3':
                this.modalDate.cardType =
                    'https://www.aexp-static.com/cdaas/one/statics/axp-static-assets/1.8.0/package/dist/img/logos/dls-logo-stack.svg';
                break;
            default:
                this.modalDate.cardType =
                    'https://i.guim.co.uk/img/media/b73cc57cb1d46ae742efd06b6c58805e8600d482/16_0_2443_1466/master/2443.jpg?width=700&quality=85&auto=format&fit=max&s=fb1dca6cdd4589cd9ef2fc941935de71';
        }
        if (letters.test(value)) {
            this.modalDate.error.cardNumber = false;
        } else {
            this.modalDate.error.cardNumber = true;
        }
        this.commit(this.cartLots, this.products);
    }
    handleCardValid(value: string) {
        const letters = /(\d{1}|[1-2]{1}[0-9]{1})[/]\d{2}/;
        this.modalDate.cardValid = value;
        if (letters.test(value)) {
            this.modalDate.error.cardValid = false;
        } else {
            this.modalDate.error.cardValid = true;
        }
        this.commit(this.cartLots, this.products);
    }
    handleCardCVV(value: string) {
        const letters = /[0-9]{3}/;
        this.modalDate.cardCVV = Number(value);
        if (letters.test(value)) {
            this.modalDate.error.cardCVV = false;
        } else {
            this.modalDate.error.cardCVV = true;
        }
        this.commit(this.cartLots, this.products);
    }
    handleConfirmButton() {
        if (
            this.modalDate.error.name !== true &&
            this.modalDate.error.phone !== true &&
            this.modalDate.error.address !== true &&
            this.modalDate.error.mail !== true &&
            this.modalDate.error.cardNumber !== true &&
            this.modalDate.error.cardValid !== true &&
            this.modalDate.error.cardCVV !== true &&
            this.modalDate.name !== '' &&
            this.modalDate.phone !== '' &&
            this.modalDate.address !== '' &&
            this.modalDate.mail !== '' &&
            this.modalDate.cardNumber !== '' &&
            this.modalDate.cardValid !== '' &&
            !Number.isNaN(this.modalDate.cardCVV)
        ) {
            //todo очистить корзину и перекинуть на главную
            //Не раскомменчивать до желания потереть корзину
            //this.cartLots = [];
            //localStorage.cart = JSON.stringify(cartLots);
            window.location.hash = '';
            this.modalDate.state = false;
            throw alert('Done');
        } else {
            if (this.modalDate.name == '') this.modalDate.error.name = true;
            if (this.modalDate.phone == '') this.modalDate.error.phone = true;
            if (this.modalDate.address == '') this.modalDate.error.address = true;
            if (this.modalDate.mail == '') this.modalDate.error.mail = true;
            if (this.modalDate.cardNumber == '') this.modalDate.error.cardNumber = true;
            if (this.modalDate.cardValid == '') this.modalDate.error.cardValid = true;
            if (Number.isNaN(this.modalDate.cardCVV)) this.modalDate.error.cardCVV = true;
        }
        this.commit(this.cartLots, this.products);
    }
}
