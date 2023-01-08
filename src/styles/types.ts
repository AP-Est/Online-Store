export interface ICartLot {
    id: number;
    count: number;
    price: number;
}
export interface IProduct {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}
export interface IStoreData {
    products: IProduct[];
    total: number;
    skip: number;
    limit: number;
}

export interface IFilterData {
    categories: string[];
    brands: string[];
    minPrice: number | null;
    maxPrice: number | null;
    minStock: number | null;
    maxStock: number | null;
    search: string;
    sort: string;
}

export interface IPlug {
    limit: number;
    page: number;
    startNumberID: number;
}
export interface ISumm {
    countItems: number;
    priceTotal: number;
    priceWithCodes: number;
    codes: ICode[];
}

export interface ICode {
    title: string;
    description: string;
    discount: number;
}

export interface IModalData {
    state: boolean;
    error: IError;
    name: string;
    phone: string;
    address: string;
    mail: string;
    cardNumber: string;
    cardType: string;
    cardValid: string;
    cardCVV: number;
}

interface IError {
    name: boolean;
    phone: boolean;
    address: boolean;
    mail: boolean;
    cardNumber: boolean;
    cardValid: boolean;
    cardCVV: boolean;
}
