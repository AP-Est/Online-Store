import { ICartLot } from '../types/types';

export default function NotANull() {
    const storageArray: ICartLot[] = JSON.parse(localStorage.cart);
    localStorage.cart = JSON.stringify(
        storageArray.filter((obj) => {
            if (obj != null) {
                return obj;
            }
        })
    );
}
