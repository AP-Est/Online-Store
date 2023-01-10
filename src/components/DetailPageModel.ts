import { storeData } from '../data/data';
import { ICartLot, IProduct, IStoreData } from '../styles/types';
import checkLocalStorage from '../utils/checkLocalstorage';
export class DetailPageModel {
    cartLots: ICartLot[];
    storeData!: IStoreData;
    products!: IProduct[];
    onChangeModel!: CallableFunction;

    constructor() {
        if (!localStorage.getItem('cart')) {
            const storageArray: ICartLot[] = [];
            localStorage.setItem('cart', JSON.stringify(storageArray));
        }
        this.cartLots = JSON.parse(localStorage.cart) || [];
        this.storeData = storeData;
    }

    bindChangeModel(callback: CallableFunction) {
        this.onChangeModel = callback;
    }
    private commit() {
        this.onChangeModel(this.storeData);
    }
    private addModalFlag() {
        if (!localStorage.getItem('modalOn')) {
            localStorage.setItem('modalOn', 'true');
        } else {
            localStorage.modalOn = 'true';
        }
    }
    private addProduct(itemId: number) {
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
    }
    handlePushToLocalStorage(itemId: number) {
        this.addProduct(itemId);
        this.commit();
    }
    handleDropFromLocalStorage(itemId: number) {
        const storageArray: ICartLot[] = JSON.parse(localStorage.cart);
        localStorage.cart = JSON.stringify(storageArray.filter((obj) => obj.id !== itemId));
        this.commit();
    }
    handleFastBuy(itemId: number) {
        if (checkLocalStorage(itemId) === false) {
            this.addProduct(itemId);
        }
        this.addModalFlag();
        window.location.hash = 'cart/';
    }
}
