import { storeData } from '../data/data';

interface ICartLots {
    id: number;
    count: number;
    price: number;
}

export default function pushToLocalStorage(id: number) {
    const storageObject: ICartLots = {
        id: id,
        count: 1,
        price: storeData.products[id - 1].price,
    };
    if (!localStorage.getItem('cart')) {
        const storageArray: ICartLots[] = [storageObject];
        localStorage.setItem('cart', JSON.stringify(storageArray));
    } else {
        const storageArray: ICartLots[] = JSON.parse(localStorage.cart);
        storageArray.push(storageObject);
        localStorage.cart = JSON.stringify(storageArray);
    }
}
