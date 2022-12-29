import { ICartLots } from '../styles/types';

export default function NotANull() {
    const storageArray: ICartLots[] = JSON.parse(localStorage.cart);
    localStorage.cart = JSON.stringify(
        storageArray.filter((obj) => {
            if (obj != null) {
                return obj;
            }
        })
    );
}
