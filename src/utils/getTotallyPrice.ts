import { ICartLot } from '../styles/types';

export default function getTotallyPrice() {
    if (localStorage.cart && localStorage.cart != null) {
        const storageArray: ICartLot[] = JSON.parse(localStorage.cart);
        if (storageArray[0] != null) {
            return storageArray.reduce((acc, obj) => acc + obj.price * obj.count, 0);
        } else return 0;
    } else return 0;
}
