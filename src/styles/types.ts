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
}
