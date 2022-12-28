import { storeData } from '../data/data';
import { IProduct } from '../data/data';

export default function filterArray(key: keyof IProduct) {
    const tempArray = [...storeData.products];
    return Array.from(new Set(tempArray.map((item) => item[key])));
}
