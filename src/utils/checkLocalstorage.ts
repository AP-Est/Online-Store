import { ICartLots } from '../styles/types';

export default function checkLocalStorage(id: number) {
    const storageArray: ICartLots[] = JSON.parse(localStorage.cart);
    return storageArray
        .map((e) => {
            return e.id;
        })
        .includes(id);
}
