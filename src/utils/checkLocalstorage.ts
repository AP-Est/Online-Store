import { ICartLot } from '../styles/types';

export default function checkLocalStorage(id: number): boolean {
    if (localStorage.cart && localStorage.cart != null) {
        const storageArray: ICartLot[] = JSON.parse(localStorage.cart);
        if (storageArray.length > 0) {
            return storageArray
                .map((e) => {
                    return e.id;
                })
                .includes(id);
        }
        return false;
    }
    return false;
}
