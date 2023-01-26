import { ICartLot } from '../types/types';

export default function delFromLocalStorage(id: number) {
    const storageArray: ICartLot[] = JSON.parse(localStorage.cart);
    localStorage.cart = JSON.stringify(storageArray.filter((obj) => obj.id !== id));
}
