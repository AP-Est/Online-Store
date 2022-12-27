import { storeData } from '../data/data';

interface IStorageObject {
    id: number;
    count: number;
    price: number;
}

export default function pushToLocalStorage(id: number) {
    const storageObject: IStorageObject = {
        id: id,
        count: 1,
        price: storeData.products[id - 1].price,
    };
    if (!localStorage.getItem('cart')) {
        const storageArray: IStorageObject[] = [storageObject];
        localStorage.setItem('cart', JSON.stringify(storageArray));
    } else {
        const storageArray: IStorageObject[] = JSON.parse(localStorage.cart);
        storageArray.push(storageObject);
        localStorage.cart = JSON.stringify(storageArray);
    }
}
