import { IProduct, IStoreData, storeData } from '../data/data';
import { ICartLot, ICode, IModalData, IPlug, ISumm } from '../styles/types';
import checkToNull from '../utils/notANull';
export class CartPageModel {
    products: IProduct[];
    cartLots: ICartLot[];
    cartView: ICartLot[];
    storeData: IStoreData;
    onChangeModel!: CallableFunction;
    pagination: IPlug;
    summaryVars: ISumm;
    AvailableCodes: ICode[];
    modalData: IModalData;
    modalOn: string;

    constructor() {
        checkToNull();
        this.AvailableCodes = [
            { title: 'AN', description: 'Andrey`s code', discount: 10 },
            { title: 'NA', description: 'Nat`s code', discount: 10 },
        ];
        const pageStartVar = 1;
        const limitStartVar = 3;
        const startNumberIDStartVar = 1;
        this.pagination = {
            limit: limitStartVar,
            page: pageStartVar,
            startNumberID: startNumberIDStartVar,
        };
        this.summaryVars = {
            countItems: 0,
            getPriceTotal: 0,
            getPriceWithCodes: 0,
            codes: [{ title: 'AN', description: 'Andrey`s code - 10% - ', discount: 10 }],
        };
        this.modalData = {
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
            cardCVV: 0,
        };
        this.modalOn = localStorage.modalOn;
        this.checkModalOn();
        this._getStartNumber(this.pagination);
        this.cartLots = JSON.parse(localStorage.cart) || [];
        this.cartView = [];
        this._getCartView(this.pagination);
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
        this._getStartNumber(this.pagination);
        this._getCartView(this.pagination);
        this._checkEmptyArray();
        localStorage.cart = JSON.stringify(cartLots);
        this.onChangeModel(this.cartView, products, this.pagination, this.summaryVars, this.modalData);
    }
    private _getCartView = (pagination: IPlug) => {
        this._getStartNumber(pagination);
        if (this.cartLots.length > pagination.limit) {
            this.cartView = this.cartLots.slice(
                (pagination.page - 1) * pagination.limit,
                pagination.page * pagination.limit
            );
        } else this.cartView = this.cartLots;
    };
    private _getStartNumber = (pagination: IPlug) => {
        this.pagination.startNumberID = pagination.page * pagination.limit - pagination.limit + 1;
    };

    private _checkEmptyArray = () => {
        if (this.cartLots !== undefined && this.cartLots.length !== 0) {
            if (this.cartLots.length < this.pagination.page * this.pagination.limit) {
                if (this.cartLots.length / this.pagination.limit >= 1) {
                    this.pagination.page = Math.ceil(this.cartLots.length / this.pagination.limit);
                } else this.pagination.page = 1;
                this._getCartView(this.pagination);
                this.setQueryParameters();
            }
        }
    };
    private _getSummaryVars = () => {
        const count = () => {
            return this.cartLots.reduce((acc, obj) => acc + obj.count, 0);
        };
        const getPriceTotal = () => {
            return this.cartLots.reduce((acc, obj) => acc + obj.price * obj.count, 0);
        };
        const getPriceWithCodes = () => {
            const fullPercent = 100;
            const onePercent = 0.01;
            return (getPriceTotal() * (fullPercent - this._discountSummary()) * onePercent).toFixed(2);
        };

        this.summaryVars.countItems = count();
        this.summaryVars.getPriceTotal = getPriceTotal();
        this.summaryVars.getPriceWithCodes = +getPriceWithCodes();
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
        url.searchParams.set('limit', String(this.pagination.limit));
        url.searchParams.set('page', String(this.pagination.page));
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
        history.pushState(null, '', url);
    }
    private getQueryParameters() {
        const url = new URL(location.href);
        this.pagination.limit = Number(url.searchParams.get('limit')) || 3;
        this.pagination.page = Number(url.searchParams.get('page')) || 1;
    }
    private checkModalOn() {
        if (this.modalOn && this.modalOn == 'true') {
            localStorage.modalOn = 'false';
            this.modalData.state = true;
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
        this.cartLots = _tempArray as ICartLot[];
        this.commit(this.cartLots, this.products);
    }

    handlePageIncrement() {
        if (this.cartLots.length > this.pagination.page * this.pagination.limit) {
            this.pagination.page += 1;
        }
        this.setQueryParameters();
        this.commit(this.cartLots, this.products);
    }

    handlePageDecrement() {
        if (this.pagination.page > 1) {
            this.pagination.page -= 1;
        }
        this.setQueryParameters();
        this.commit(this.cartLots, this.products);
    }
    handleLimitChanged(limit: number) {
        this.pagination.limit = limit;
        if (this.cartLots.length <= this.pagination.limit) {
            if (this.pagination.page > 1) {
                this._checkEmptyArray();
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
        this.modalData.state = true;
        this.commit(this.cartLots, this.products);
    }
    handleCloseModalWindow() {
        this.modalData.state = false;
        this.commit(this.cartLots, this.products);
    }
    handleName(value: string) {
        const letters = /^[A-Za-z]{3,}\s[A-Za-z]{3,}\w*/;
        this.modalData.name = value;
        if (letters.test(value)) {
            this.modalData.error.name = false;
        } else {
            this.modalData.error.name = true;
        }
        this.commit(this.cartLots, this.products);
    }
    handlePhone(value: string) {
        const numbers = /^[+]+[0-9]{9,}/;
        this.modalData.phone = value;
        if (numbers.test(value)) {
            this.modalData.error.phone = false;
        } else {
            this.modalData.error.phone = true;
        }
        this.commit(this.cartLots, this.products);
    }
    handleAddress(value: string) {
        const letters = /^[0-9a-zA-Z,.]{5,}\s[0-9a-zA-Z,.]{5,}\s[0-9a-zA-Z,.]{5,}/;
        this.modalData.address = value;
        if (letters.test(value)) {
            this.modalData.error.address = false;
        } else {
            this.modalData.error.address = true;
        }
        this.commit(this.cartLots, this.products);
    }
    handleMail(value: string) {
        const letters = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*[.](\w{2,3})$/;
        this.modalData.mail = value;
        if (letters.test(value)) {
            this.modalData.error.mail = false;
        } else {
            this.modalData.error.mail = true;
        }
        this.commit(this.cartLots, this.products);
    }
    handleCardNumber(value: string) {
        const letters = /\d{4}([-]|\s|)\d{4}([-]|\s|)\d{4}([-]|\s|)\d{4}/;
        this.modalData.cardNumber = value;
        switch (value[0]) {
            case '4':
                this.modalData.cardType = 'https://cdn.visa.com/v2/assets/images/logos/visa/blue/logo.png';
                break;
            case '5':
                this.modalData.cardType =
                    'https://www.mastercard.hu/content/dam/public/mastercardcom/eu/hu/images/mc-logo-52.svg';
                break;
            case '6':
                this.modalData.cardType = 'https://m.unionpayintl.com/imp_file/global/wap/en/static/images/logo.png';
                break;
            case '3':
                this.modalData.cardType =
                    'https://www.aexp-static.com/cdaas/one/statics/axp-static-assets/1.8.0/package/dist/img/logos/dls-logo-stack.svg';
                break;
            default:
                this.modalData.cardType =
                    'https://i.guim.co.uk/img/media/b73cc57cb1d46ae742efd06b6c58805e8600d482/16_0_2443_1466/master/2443.jpg?width=700&quality=85&auto=format&fit=max&s=fb1dca6cdd4589cd9ef2fc941935de71';
        }
        if (letters.test(value)) {
            this.modalData.error.cardNumber = false;
        } else {
            this.modalData.error.cardNumber = true;
        }
        this.commit(this.cartLots, this.products);
    }
    handleCardValid(value: string) {
        const letters = /^([1]{1}[0-2]{1}|[0]{1}[1-9]{1})[/]([3-9]{1}[0-9]{1}|[2]{1}[3-9]{1})$/;
        this.modalData.cardValid = value;
        if (letters.test(value)) {
            this.modalData.error.cardValid = false;
        } else {
            this.modalData.error.cardValid = true;
        }
        this.commit(this.cartLots, this.products);
    }
    handleCardCVV(value: string) {
        const letters = /[0-9]{3}/;
        this.modalData.cardCVV = Number(value);
        if (letters.test(value)) {
            this.modalData.error.cardCVV = false;
        } else {
            this.modalData.error.cardCVV = true;
        }
        this.commit(this.cartLots, this.products);
    }
    handleConfirmButton() {
        if (
            this.modalData.error.name !== true &&
            this.modalData.error.phone !== true &&
            this.modalData.error.address !== true &&
            this.modalData.error.mail !== true &&
            this.modalData.error.cardNumber !== true &&
            this.modalData.error.cardValid !== true &&
            this.modalData.error.cardCVV !== true &&
            this.modalData.name !== '' &&
            this.modalData.phone !== '' &&
            this.modalData.address !== '' &&
            this.modalData.mail !== '' &&
            this.modalData.cardNumber !== '' &&
            this.modalData.cardValid !== '' &&
            !Number.isNaN(this.modalData.cardCVV)
        ) {
            this.cartLots = [];
            localStorage.cart = JSON.stringify(this.cartLots);
            window.location.hash = '';
            this.modalData.state = false;
            throw alert('Purchase completed successfully!');
        } else {
            if (this.modalData.name == '') this.modalData.error.name = true;
            if (this.modalData.phone == '') this.modalData.error.phone = true;
            if (this.modalData.address == '') this.modalData.error.address = true;
            if (this.modalData.mail == '') this.modalData.error.mail = true;
            if (this.modalData.cardNumber == '') this.modalData.error.cardNumber = true;
            if (this.modalData.cardValid == '') this.modalData.error.cardValid = true;
            if (Number.isNaN(this.modalData.cardCVV)) this.modalData.error.cardCVV = true;
        }
        this.commit(this.cartLots, this.products);
    }
}
