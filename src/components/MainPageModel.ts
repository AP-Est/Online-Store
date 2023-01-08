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
        //console.log('MainPageModel minPriceProducts:', minPriceProducts);
        //console.log('MainPageModel maxPriceProducts:', maxPriceProducts);
        this.filter = {
            categories: [],
            brands: [],
            minPrice: this.minPriceProducts,
            maxPrice: this.maxPriceProducts,
            minStock: this.minStockProducts,
            maxStock: this.maxStockProducts,
            search: '',
            sort: '',
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

    addRemoveCategory(category: string) {
        //const url = new URL(location.href);
        //location.search = '';
        if (this.filter.categories.includes(category)) {
            this.filter.categories = this.filter.categories.filter((cur) => cur !== category);
            //url.searchParams.delete('category');
            console.log('remove', this.filter.categories);
        } else {
            this.filter.categories.push(category);
            //url.searchParams.set('category', category);
            //console.log(' url', url);
        }
        this.onChangeModel(this.products, this.filter, 0, 0);
        setQueryParameters(this.filter);
        console.log('addRemoveCategory');
    }

    addRemoveBrand(brand: string) {
        if (this.filter.brands.includes(brand)) {
            this.filter.brands = this.filter.brands.filter((cur) => cur !== brand);
            //console.log('remove', this.filter.categories);
        } else {
            this.filter.brands.push(brand);
            //console.log('add', this.filter.categories);
        }
        this.onChangeModel(this.products, this.filter, 0, 0);
        setQueryParameters(this.filter);
        //console.log('add category filter:');
    }

    addSearch(searchString: string) {
        this.filter.search = searchString;
        //console.log('addSearch this.filter', this.filter);
        this.onChangeModel(this.products, this.filter, 0, 0);
        setQueryParameters(this.filter);
        //console.log('add category filter:');
    }

    addSort(sortString: string) {
        this.filter.sort = sortString;
        console.log('addSort filter:', this.filter);
        this.onChangeModel(this.products, this.filter, 0, 0);
        setQueryParameters(this.filter);
    }

    changeMinMaxPrice(priceOne: number, priceTwo: number) {
        //console.log('changeMinMaxPrice priceOne', priceOne);
        //console.log('changeMinMaxPrice priceTwo', priceTwo);
        if (priceOne <= priceTwo) {
            this.filter.minPrice = priceOne;
            this.filter.maxPrice = priceTwo;
        } else {
            this.filter.minPrice = priceTwo;
            this.filter.maxPrice = priceOne;
        }
        this.onChangeModel(this.products, this.filter, 0, 0);
        console.log('changeMinMaxPrice this.filter', this.filter);
        setQueryParameters(this.filter);
    }

    changeMinMaxStock(stockOne: number, stockTwo: number) {
        // console.log('changeMinMaxPrice priceOne', priceOne);
        //console.log('changeMinMaxPrice priceTwo', priceTwo);
        if (stockOne <= stockTwo) {
            this.filter.minStock = stockOne;
            this.filter.maxStock = stockTwo;
        } else {
            this.filter.minStock = stockTwo;
            this.filter.maxStock = stockOne;
        }
        this.onChangeModel(this.products, this.filter, 0, 0);
        console.log('changeMinMaxStock this.filter', this.filter);
        setQueryParameters(this.filter);
    }

    // addFilter(filter: IFilterData) {
    //     this.filter = filter;
    //     // console.log('addFilter filter', filter);
    //     this.onChangeModel(this.products, this.filter, 0, 0);
    // }

    // filter products

    filterByCategory(products: IProduct[], categories: string[]) {
        if (categories.length === 0) return products;
        const productsFiltered: IProduct[] = [];
        this.products.map((cur) => {
            for (const currentCategory of categories) {
                if (cur.category === currentCategory) {
                    // console.log('match');
                    productsFiltered.push(cur);
                }
            }
        });
        //console.log('filterByCategory productsFiltered', productsFiltered);
        return productsFiltered;
    }

    filterByBrand(products: IProduct[], brands: string[]) {
        //console.log('filterBrand brands', brands);
        //console.log('filterBrand products', products);
        if (brands.length === 0) return products;
        const productsFiltered: IProduct[] = [];
        this.products.map((cur) => {
            for (const currentBrand of brands) {
                if (cur.brand === currentBrand) {
                    // console.log('match');
                    productsFiltered.push(cur);
                }
            }
        });
        //console.log('filterBrand productsFiltered', productsFiltered);
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
            console.log('sorting products:', products);
        }
        if (sortString === 'PriceDESC') {
            products.sort((item1, item2) => item2.price - item1.price);
            console.log('sorting products:', products);
        }
        if (sortString === 'RatingASC') {
            products.sort((item1, item2) => item1.rating - item2.rating);
            console.log('sorting products:', products);
        }
        if (sortString === 'RatingDESC') {
            products.sort((item1, item2) => item2.rating - item1.rating);
            console.log('sorting products:', products);
        }
        if (sortString === 'DiscountASC') {
            products.sort((item1, item2) => item1.discountPercentage - item2.discountPercentage);
            console.log('sorting products:', products);
        }
        if (sortString === 'DiscountDESC') {
            products.sort((item1, item2) => item2.discountPercentage - item1.discountPercentage);
            console.log('sorting products:', products);
        }
        return products;
    }

    filterPrice(products: IProduct[], minPrice: number, maxPrice: number) {
        if (minPrice === this.minPriceProducts && maxPrice === this.maxPriceProducts) return products;
        const productsFiltered = this.products.filter((cur) => {
            return cur.price >= minPrice && cur.price <= maxPrice;
        });
        // console.log('filterPrice productsFiltered', productsFiltered);
        // console.log('filterPrice minPrice', minPrice);
        // console.log('filterPrice maxPrice', maxPrice);
        // console.log('filterPrice products', products);
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
        // return this.filterStock(
        //     this.filterPrice(
        //         this.filterBrand(this.filterByCategory(products, filter.categories), filter.brands),
        //         filter.minPrice,
        //         filter.maxPrice
        //     ),
        //     filter.minStock,
        //     filter.maxStock
        // );
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
        //console.log('productFiltered', productFiltered);
        // return this.sorting(
        //     this.filterStock(
        //         this.filterPrice(productFiltered, filter.minPrice, filter.maxPrice),
        //         filter.minStock,
        //         filter.maxStock
        //     ),
        //     filter.sort
        // );
        return this.sorting(productFiltered, filter.sort);
    }

    bindChangeModel(
        callback: (products: IProduct[], filter: IFilterData, totalCost: number, numProducts: number) => void
    ) {
        this.onChangeModel = callback;
    }
}
