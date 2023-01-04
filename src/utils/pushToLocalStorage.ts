import { storeData } from '../data/data';
import { ICartLot } from '../styles/types';

export default function pushToLocalStorage(id: number) {
    const storageObject: ICartLot = {
        id: id,
        count: 1,
        price: storeData.products[id - 1].price,
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
