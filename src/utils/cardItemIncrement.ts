import { ICartLots } from '../styles/types';

export default function cardItemIncrement(id: number) {
    const storageArray: ICartLots[] = JSON.parse(localStorage.cart);
    localStorage.cart = JSON.stringify(
        storageArray.map((obj) => {
            if (obj.id === id) {
                obj.count += 1;
            }
            return obj;
        })
    );
}
