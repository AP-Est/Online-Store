import { storeData, IProduct, IFilterData } from '../data/data';

export class MainPageModel {
    products: IProduct[];
    filter: IFilterData;
    onChangeModel: any;

    constructor() {
        this.onChangeModel = () => {
            return undefined;
        };
        this.products = storeData.products;
        this.filter = {
            categories: [],
            brands: [],
            minPrice: null,
            maxPrice: null,
            minStock: null,
            maxStock: null,
            search: '',
            sort: '',
        };
    }

    // removeCategory(category: string) {
    //     this.filter.categories = this.filter.categories.filter((cur) => cur !== category);
    //     //console.log('removeCategory');
    //     //console.log(this.onChangeModel);
    //     this.onChangeModel(this.products, this.filter, 0, 0);
    //     console.log('remove category filter:', this.filter);
    // }

    addRemoveCategory(category: string) {
        if (this.filter.categories.includes(category)) {
            this.filter.categories = this.filter.categories.filter((cur) => cur !== category);
            console.log('remove', this.filter.categories);
        } else {
            this.filter.categories.push(category);
            console.log('add', this.filter.categories);
        }
        this.onChangeModel(this.products, this.filter, 0, 0);
        //console.log('add category filter:', this.filter);
    }

    removeBrand(brand: string) {
        this.filter.brands = this.filter.brands.filter((cur) => cur !== brand);
        this.onChangeModel(this.products, this.filter, 0, 0);
    }

    addBrand(brand: string) {
        this.filter.brands.push(brand);
        this.onChangeModel(this.products, this.filter, 0, 0);
    }

    changeMinPrice(minPrice: number) {
        this.filter.minPrice = minPrice;
        this.onChangeModel(this.products, this.filter, 0, 0);
    }

    changeMaxPrice(maxPrice: number) {
        this.filter.maxPrice = maxPrice;
        this.onChangeModel(this.products, this.filter, 0, 0);
    }

    changeMinStock(minStock: number) {
        this.filter.minStock = minStock;
        this.onChangeModel(this.products, this.filter, 0, 0);
    }

    changeMaxStock(maxStock: number) {
        this.filter.maxStock = maxStock;
        this.onChangeModel(this.products, this.filter, 0, 0);
    }

    // filter products

    filterByCategory(products: IProduct[], categories: string[]) {
        if (categories.length === 0) return products;
        const productsFiltered = this.products.filter((cur) => {
            for (const currentCategory of categories) {
                cur.category === currentCategory;
            }
        });
        return productsFiltered;
    }

    filterBrand(products: IProduct[], brands: string[]) {
        if (brands.length === 0) return products;
        const productsFiltered = this.products.filter((cur) => {
            for (const currentCategory of brands) {
                cur.brand === currentCategory;
            }
        });
        return productsFiltered;
    }

    filterPrice(products: IProduct[], minPrice: number | null, maxPrice: number | null) {
        if (minPrice === null && maxPrice === null) return products;
        const productsFiltered = this.products.filter((cur) => {
            if (minPrice === null && maxPrice !== null) {
                cur.price <= maxPrice;
            } else if (maxPrice === null && minPrice !== null) {
                cur.price >= minPrice;
            } else if (maxPrice !== null && minPrice !== null) {
                cur.price >= minPrice && cur.price <= maxPrice;
            }
        });
        return productsFiltered;
    }

    filterStock(products: IProduct[], minStock: number | null, maxStock: number | null) {
        if (minStock === null && maxStock === null) return products;
        const productsFiltered = this.products.filter((cur) => {
            if (minStock === null && maxStock !== null) {
                cur.stock <= maxStock;
            } else if (maxStock === null && minStock !== null) {
                cur.stock >= minStock;
            } else if (maxStock !== null && minStock !== null) {
                cur.stock >= minStock && cur.stock <= maxStock;
            }
        });
        return productsFiltered;
    }

    getProductsToShow(products: IProduct[], filter: IFilterData) {
        return this.filterStock(
            this.filterPrice(
                this.filterBrand(this.filterByCategory(products, filter.categories), filter.brands),
                filter.minPrice,
                filter.maxPrice
            ),
            filter.minStock,
            filter.maxStock
        );
    }

    bindChangeModel(
        callback: (products: IProduct[], filter: IFilterData, totalCost: number, numProducts: number) => void
    ) {
        this.onChangeModel = callback;
    }
}
