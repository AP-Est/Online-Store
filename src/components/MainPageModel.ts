import { storeData, IProduct, IFilterData } from '../data/data';
import setQueryParameters from '../utils/setQueryParameters';
import pushToLocalStorage from '../utils/pushToLocalStorage';
import delFromLocalStorage from '../utils/delFromLocalStorage';
import checkLocalStorage from '../utils/checkLocalstorage';

export class MainPageModel {
    products: IProduct[];
    filter: IFilterData;
    onChangeModel: (products: IProduct[], filter: IFilterData, totalCost: number, numProducts: number) => void;
    minPriceProducts: number;
    maxPriceProducts: number;
    minStockProducts: number;
    maxStockProducts: number;

    constructor() {
        this.onChangeModel = () => {
            return undefined;
        };
        this.products = storeData.products;
        const locationSearch = window.location.search.replace('?', '').split('&');
        this.minPriceProducts = this.products.reduce((acc: number, date: IProduct) => {
            return date.price < acc ? date.price : acc;
        }, this.products[0].price);
        this.maxPriceProducts = this.products.reduce((acc: number, date: IProduct) => {
            return date.price > acc ? date.price : acc;
        }, this.products[0].price);
        this.minStockProducts = this.products.reduce((acc: number, date: IProduct) => {
            return date.stock < acc ? date.stock : acc;
        }, this.products[0].price);
        this.maxStockProducts = this.products.reduce((acc: number, date: IProduct) => {
            return date.stock > acc ? date.stock : acc;
        }, this.products[0].price);
        this.filter = {
            categories: [],
            brands: [],
            minPrice: this.minPriceProducts,
            maxPrice: this.maxPriceProducts,
            minStock: this.minStockProducts,
            maxStock: this.maxStockProducts,
            search: '',
            sort: '',
            view: 'small',
        };
        locationSearch.map((item) => {
            const [filterKey, filterValue] = item.split('=');
            switch (filterKey) {
                case 'category':
                    this.filter.categories = filterValue.split('_');
                    break;
                case 'brand':
                    this.filter.brands = filterValue.split('_');
                    break;
                case 'search':
                    this.filter.search = filterValue;
                    break;
                case 'sort':
                    this.filter.sort = filterValue;
                    break;
                case 'minPrice':
                    this.filter.minPrice = Number(filterValue);
                    break;
                case 'maxPrice':
                    this.filter.maxPrice = Number(filterValue);
                    break;
                case 'minStock':
                    this.filter.minStock = Number(filterValue);
                    break;
                case 'maxStock':
                    this.filter.maxStock = Number(filterValue);
                    break;
                case 'view':
                    this.filter.view = filterValue;
                    break;
            }
        });
    }

    addToRemoveFromCart(cardNumber: number) {
        if (checkLocalStorage(cardNumber)) {
            delFromLocalStorage(cardNumber);
        } else {
            pushToLocalStorage(cardNumber);
        }
        this.onChangeModel(this.products, this.filter, 0, 0);
    }

    resetFilters() {
        this.filter = {
            categories: [],
            brands: [],
            minPrice: this.minPriceProducts,
            maxPrice: this.maxPriceProducts,
            minStock: this.minStockProducts,
            maxStock: this.maxStockProducts,
            search: '',
            sort: '',
            view: 'small',
        };
        this.onChangeModel(this.products, this.filter, 0, 0);
        setQueryParameters(this.filter);
    }

    addRemoveCategory(category: string) {
        if (this.filter.categories.includes(category)) {
            this.filter.categories = this.filter.categories.filter((cur) => cur !== category);
        } else {
            this.filter.categories.push(category);
        }
        this.onChangeModel(this.products, this.filter, 0, 0);
        setQueryParameters(this.filter);
    }

    addRemoveBrand(brand: string) {
        if (this.filter.brands.includes(brand)) {
            this.filter.brands = this.filter.brands.filter((cur) => cur !== brand);
        } else {
            this.filter.brands.push(brand);
        }
        this.onChangeModel(this.products, this.filter, 0, 0);
        setQueryParameters(this.filter);
    }

    addSearch(searchString: string) {
        this.filter.search = searchString;
        this.onChangeModel(this.products, this.filter, 0, 0);
        setQueryParameters(this.filter);
    }

    addSort(sortString: string) {
        this.filter.sort = sortString;
        this.onChangeModel(this.products, this.filter, 0, 0);
        setQueryParameters(this.filter);
    }

    addSetView(stringView: string) {
        this.filter.view = stringView;
        this.onChangeModel(this.products, this.filter, 0, 0);
        setQueryParameters(this.filter);
    }

    changeMinMaxPrice(priceOne: number, priceTwo: number) {
        if (priceOne <= priceTwo) {
            this.filter.minPrice = priceOne;
            this.filter.maxPrice = priceTwo;
        } else {
            this.filter.minPrice = priceTwo;
            this.filter.maxPrice = priceOne;
        }
        this.onChangeModel(this.products, this.filter, 0, 0);
        setQueryParameters(this.filter);
    }

    changeMinMaxStock(stockOne: number, stockTwo: number) {
        if (stockOne <= stockTwo) {
            this.filter.minStock = stockOne;
            this.filter.maxStock = stockTwo;
        } else {
            this.filter.minStock = stockTwo;
            this.filter.maxStock = stockOne;
        }
        this.onChangeModel(this.products, this.filter, 0, 0);
        setQueryParameters(this.filter);
    }

    filterByCategory(products: IProduct[], categories: string[]) {
        if (categories.length === 0) return products;
        const productsFiltered: IProduct[] = [];
        this.products.map((cur) => {
            for (const currentCategory of categories) {
                if (cur.category === currentCategory) {
                    productsFiltered.push(cur);
                }
            }
        });
        return productsFiltered;
    }

    filterByBrand(products: IProduct[], brands: string[]) {
        if (brands.length === 0) return products;
        const productsFiltered: IProduct[] = [];
        this.products.map((cur) => {
            for (const currentBrand of brands) {
                if (cur.brand === currentBrand) {
                    productsFiltered.push(cur);
                }
            }
        });
        return productsFiltered;
    }

    filterBySearch(products: IProduct[], searchString: string) {
        if (searchString === '') return products;
        const searchUpper = searchString.toUpperCase();
        const productsFiltered = products.filter(
            (item) =>
                item.title.toUpperCase().includes(searchUpper) ||
                item.description.toUpperCase().includes(searchUpper) ||
                String(item.price).toUpperCase().includes(searchUpper) ||
                String(item.discountPercentage).toUpperCase().includes(searchUpper) ||
                String(item.rating).toUpperCase().includes(searchUpper) ||
                String(item.stock).toUpperCase().includes(searchUpper) ||
                item.brand.toUpperCase().includes(searchUpper) ||
                item.category.toUpperCase().includes(searchUpper)
        );
        return productsFiltered;
    }

    sorting(products: IProduct[], sortString: string) {
        if (sortString === '') return products;
        if (sortString === 'PriceASC') {
            products.sort((item1, item2) => item1.price - item2.price);
        }
        if (sortString === 'PriceDESC') {
            products.sort((item1, item2) => item2.price - item1.price);
        }
        if (sortString === 'RatingASC') {
            products.sort((item1, item2) => item1.rating - item2.rating);
        }
        if (sortString === 'RatingDESC') {
            products.sort((item1, item2) => item2.rating - item1.rating);
        }
        if (sortString === 'DiscountASC') {
            products.sort((item1, item2) => item1.discountPercentage - item2.discountPercentage);
        }
        if (sortString === 'DiscountDESC') {
            products.sort((item1, item2) => item2.discountPercentage - item1.discountPercentage);
        }
        return products;
    }

    filterPrice(products: IProduct[], minPrice: number, maxPrice: number) {
        if (minPrice === this.minPriceProducts && maxPrice === this.maxPriceProducts) return products;
        const productsFiltered = this.products.filter((cur) => {
            return cur.price >= minPrice && cur.price <= maxPrice;
        });
        return productsFiltered;
    }

    filterStock(products: IProduct[], minPrice: number, maxPrice: number) {
        if (minPrice === this.minStockProducts && maxPrice === this.maxStockProducts) return products;
        const productsFiltered = this.products.filter((cur) => {
            return cur.stock >= minPrice && cur.stock <= maxPrice;
        });
        return productsFiltered;
    }

    getProductsToShow(products: IProduct[], filter: IFilterData) {
        const productFilteredByCategory: IProduct[] = this.filterByCategory(products, filter.categories);
        const productFilteredByBrand: IProduct[] = this.filterByBrand(products, filter.brands);
        const productFilteredBySearch: IProduct[] = this.filterBySearch(products, filter.search);
        const productFilteredByPrice: IProduct[] = this.filterPrice(products, filter.minPrice, filter.maxPrice);
        const productFilteredByStock: IProduct[] = this.filterStock(products, filter.minStock, filter.maxStock);
        const productFiltered: IProduct[] = [];
        productFilteredByCategory.map((itemCategory) => {
            productFilteredByBrand.map((itemBrand) => {
                if (itemBrand === itemCategory) {
                    productFilteredBySearch.map((itemSearch) => {
                        if (itemBrand === itemSearch) {
                            productFilteredByPrice.map((itemPrice) => {
                                if (itemSearch === itemPrice) {
                                    productFilteredByStock.map((itemStock) => {
                                        if (itemStock === itemPrice) {
                                            productFiltered.push(itemStock);
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        });
        return this.sorting(productFiltered, filter.sort);
    }

    bindChangeModel(
        callback: (products: IProduct[], filter: IFilterData, totalCost: number, numProducts: number) => void
    ) {
        this.onChangeModel = callback;
    }
}
