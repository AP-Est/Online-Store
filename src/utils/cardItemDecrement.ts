import { ICartLot } from '../styles/types';
import delFromLocalStorage from './delFromLocalStorage';

export default function cardItemDecrement(id: number) {
    const storageArray: ICartLot[] = JSON.parse(localStorage.cart);

    localStorage.cart = JSON.stringify(
        storageArray
            .map((obj) => {
                if (obj.id === id) {
                    if (obj.count > 1) {
                        obj.count -= 1;
                    } else {
                        return '';
                    }
                }
                return obj;
            })
            .filter((obj) => {
                return obj !== '';
            })
    );
}
