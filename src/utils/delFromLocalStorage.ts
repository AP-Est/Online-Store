import { ICartLots } from '../styles/types';

export default function delFromLocalStorage(id: number) {
    const storageArray: ICartLots[] = JSON.parse(localStorage.cart);
    localStorage.cart = JSON.stringify(storageArray.filter((obj) => obj.id !== id));
}
