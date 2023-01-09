import { IProduct, IStoreData, storeData } from '../data/data';
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
    modalOn: string;

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
            codes: [{ title: 'AN', description: 'Andrey`s code - 10% - ', discount: 10 }],
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
        this.modalOn = localStorage.modalOn;
        this.checkModalOn();
        this._getStartNumber(this.plug);
        this.cartLots = JSON.parse(localStorage.cart) || [];
        this.cartView = [];
        this._getCartView(this.plug);
        this._getSummaryVars();
        this.storeData = storeData;
        this.products = storeData.products;
        this.getQueryParameters();
        this.clearQueryParameters();
    }
    bindChangeModel(callback: CallableFunction) {
        this.onChangeModel = callback;
    }
    private commit(cartLots: ICartLot[], products: IProduct[]) {
        this._getSummaryVars();
        this._getStartNumber(this.plug);
        this._getCartView(this.plug);
        this._checkEmptyArray();
        localStorage.cart = JSON.stringify(cartLots);
        this.onChangeModel(this.cartView, products, this.plug, this.summaryVars, this.modalDate);
    }
    private _getCartView = (plug: IPlug) => {
        if (this.cartLots.length > plug.limit) {
            this.cartView = this.cartLots.slice((plug.page - 1) * plug.limit, plug.page * plug.limit);
        } else this.cartView = this.cartLots;
    };
    private _getStartNumber = (plug: IPlug) => {
        this.plug.startNumberID = plug.page * plug.limit - plug.limit + 1;
    };

    private _checkEmptyArray = () => {
        if (this.cartLots !== undefined && this.cartLots.length !== 0) {
            while (this.cartView.length === 0) {
                this.plug.page -= 1;
                this._getCartView(this.plug);
            }
        }
    };
    private _getSummaryVars = () => {
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
    private _discountSummary = () => {
        const arr: ICode[] = this.summaryVars.codes;
        if (arr.length > 0) {
            return arr.reduce((acc, obj) => acc + obj.discount, 0);
        } else return 0;
    };
    private setQueryParameters() {
        const url = new URL(location.href);
        url.searchParams.delete('limit');
        url.searchParams.delete('page');
        url.searchParams.set('limit', String(this.plug.limit));
        url.searchParams.set('page', String(this.plug.page));
        history.pushState(null, '', url);
    }
    private clearQueryParameters() {
        const url = new URL(location.href);
        url.searchParams.delete('category');
        url.searchParams.delete('brand');
        url.searchParams.delete('search');
        url.searchParams.delete('sort');
        url.searchParams.delete('minPrice');
        url.searchParams.delete('maxPrice');
        url.searchParams.delete('minStock');
        url.searchParams.delete('maxStock');
        url.searchParams.delete('view');
        url.searchParams.delete('limit');
        url.searchParams.delete('page');
        history.pushState(null, '', url);
    }
    private getQueryParameters() {
        const url = new URL(location.href);
        this.plug.limit = Number(url.searchParams.get('limit')) || 3;
        this.plug.page = Number(url.searchParams.get('page')) || 1;
    }
    private checkModalOn() {
        if (this.modalOn && this.modalOn == 'true') {
            localStorage.modalOn = 'false';
            this.modalDate.state = true;
        }
    }
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

    handlePageIncrement() {
        if (this.cartLots.length > this.plug.page * this.plug.limit) {
            this.plug.page += 1;
        }
        this.setQueryParameters();
        this.commit(this.cartLots, this.products);
    }

    handlePageDecrement() {
        if (this.plug.page > 1) {
            this.plug.page -= 1;
        }
        this.setQueryParameters();
        this.commit(this.cartLots, this.products);
    }
    handleLimitChanged(limit: number) {
        this.plug.limit = limit;
        if (this.cartLots.length <= this.plug.limit) {
            if (this.plug.page > 1) {
                this.plug.page -= 1;
            }
        }
        this.setQueryParameters();
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
    handleName(value: string) {
        const letters = /^[A-Za-z]+\s[A-Za-z]*\w/;
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
        const letters = /^([1-9]{1}|[0-2]{1}[0-9]{1})[/]\d{2}$/;
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
            this.cartLots = [];
            localStorage.cart = JSON.stringify(this.cartLots);
            window.location.hash = '';
            this.modalDate.state = false;
            throw alert('Purchase completed successfully!');
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
