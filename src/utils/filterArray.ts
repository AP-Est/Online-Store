import { storeData } from '../data/data';
import { IProduct } from '../types/types';

export default function filterArray(key: keyof IProduct) {
    const tempArray = [...storeData.products];
    return Array.from(new Set(tempArray.map((item) => item[key])));
}
