import { ICartLot } from '../styles/types';

export default function StorageCheckerForWeb() {
    const storageArray: ICartLot[] = JSON.parse(localStorage.cart);
    if (storageArray.length > 0) {
        const newArray: ICartLot[] = [];
        storageArray.map((item: ICartLot) => {
            if (!newArrayCheck(newArray, item.id)) {
                newArray.push(item);
            }
        });
        localStorage.cart = JSON.stringify(newArray);
    }
}

function newArrayCheck(newArray: ICartLot[], itemId: number): boolean {
    let bool = false;
    newArray.map((item: ICartLot) => {
        if (item.id === itemId) {
            bool = true;
        }
    });
    return bool;
}
