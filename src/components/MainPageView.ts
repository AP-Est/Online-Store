import '../styles/styleMainPage.scss';
import { IProduct, IFilterData } from '../data/data'; //TODO удалить storeData, когда это будет возможно
import { View } from './BaseView';
import displayFilter from '../utils/displayFilter';
import displayCards from '../utils/displayCards';

export class MainPageView extends View {
    constructor() {
        super();
    }

    bindAddDetailAddress(handler: (cardNumber: number) => void) {
        this.mainWrapper.addEventListener('click', (event) => {
            const target = event.target as Element;
            if (target.classList.contains('cardDiv')) {
                const cardNumber = Number(target.id);
                handler(cardNumber);
            }
        });
    }

    bindAddRemoveCategory(handler: (category: string) => void) {
        // обработчик выбора новой категории

        this.mainWrapper.addEventListener('change', (event) => {
            const target = event.target as HTMLElement;
            if (target.classList.contains('checkBoxStyleCategory')) {
                //console.log('target.classList bindAddCategory', target.classList);
                const category = target.nextElementSibling?.textContent as string;
                const categoryWithoutNumbers = category.split('  ')[0];
                console.log('bindAddRemoveCategory categoryWithoutNumbers', categoryWithoutNumbers);
                handler(categoryWithoutNumbers);
            }
            //console.log('bindAddCategory modelFilter end:', this.modelFilter1);
        });
        // //console.log('bindAddCategory');
    }

    bindAddRemoveBrand(handler: (brand: string) => void) {
        // обработчик выбора нового бренда

        this.mainWrapper.addEventListener('change', (event) => {
            const target = event.target as HTMLElement;
            if (target.classList.contains('checkBoxStyleBrand')) {
                //console.log('target.classList bindAddCategory', target.classList);
                const brand = target.nextElementSibling?.textContent as string;
                const brandWithoutNumbers = brand.split('  ')[0];
                //console.log('bindAddRemoveBrand brand', brandWithoutNumbers);
                handler(brandWithoutNumbers);
            }
        });
    }

    bindChangeMinPrice(handler: (minPrice: number) => void) {
        // обработчик изменения минимальной цены
        // this.category.addEventListener('change', event => {
        //     if (event.target.type === 'checkbox') {
        //         const category = ;
        //         handler(category);
        //     }
        // })
        //handler(0);
    }

    bindChangeMaxPrice(handler: (maxPrice: number) => void) {
        // обработчик изменения максимальной цены
        // this.category.addEventListener('change', event => {
        //     if (event.target.type === 'checkbox') {
        //         const category = ;
        //         handler(category);
        //     }
        // })
        //handler(0);
    }

    bindChangeMinStock(handler: (minStock: number) => void) {
        // обработчик изменения минимального количества на складе
        // this.category.addEventListener('change', event => {
        //     if (event.target.type === 'checkbox') {
        //         const category = ;
        //         handler(category);
        //     }
        // })
        //handler(0);
    }

    bindChangeMaxStock(handler: (maxStock: number) => void) {
        // обработчик изменения максимального количества на складе
        // this.category.addEventListener('change', event => {
        //     if (event.target.type === 'checkbox') {
        //         const category = ;
        //         handler(category);
        //     }
        // })
        //handler(0);
    }

    bindSearch(handler: (searchString: string) => void) {
        // обработчик поиска

        this.mainWrapper.addEventListener('input', (event) => {
            const target = event.target as HTMLInputElement;
            if (target.classList.contains('search__input')) {
                const searchString = target.value;
                handler(searchString);
            }
        });
    }

    bindSort(handler: (sortString: string) => void) {
        // обработчик сортировки

        this.mainWrapper.addEventListener('change', (event) => {
            const target = event.target as HTMLInputElement;
            if (target.classList.contains('sort__select')) {
                const sortString = target.value;
                console.log('sortString:', sortString);
                handler(sortString);
            }
        });
    }

    bindLoadPage(handler: (filter: IFilterData) => void) {
        // обработчик сортировки
        window.addEventListener('load', () => {
            console.log('loadPage window.location.search:', window.location.search);
            const locationSearch = window.location.search;
            /* if (locationSearch !== '') {
                let stringCategory = '';
                let stringBrand = '';
                let stringSearch = '';
                let stringSort = '';
                if (locationSearch.includes('category=')) {
                    const posCategory = locationSearch.indexOf('category=');
                    if (locationSearch.includes('brand=')) {
                        const posBrand = locationSearch.indexOf('brand=');
                        stringCategory = locationSearch.slice(posCategory + 9, posBrand);
                        if (locationSearch.includes('search=')) {
                            const posSearch = locationSearch.indexOf('search=');
                            stringBrand = locationSearch.slice(posBrand + 6, posSearch);
                            if (locationSearch.includes('sort=')) {
                                const posSort = locationSearch.indexOf('sort=');
                                stringSearch = locationSearch.slice(posSearch + 7, posSort);
                                stringSort = locationSearch.slice(posSort + 6);
                            } else {
                                stringSearch = locationSearch.slice(posSearch + 7);
                            }
                        } else {
                            stringBrand = locationSearch.slice(posBrand + 6);
                        }
                    } else {
                        stringCategory = locationSearch.slice(posCategory + 9);
                    }
                    //console.log('stringCategory', stringCategory.split('_'));
                } */

            if (locationSearch !== '') {
                let stringCategory = '';
                let stringBrand = '';
                let stringSearch = '';
                let stringSort = '';

                if (locationSearch.includes('category=')) {
                    const posCategoryStart = locationSearch.indexOf('category=');
                    if (locationSearch.includes('&', posCategoryStart)) {
                        const posCategoryEnd = locationSearch.indexOf('&', posCategoryStart);
                        stringCategory = locationSearch.slice(posCategoryStart + 9, posCategoryEnd);
                    } else {
                        stringCategory = locationSearch.slice(posCategoryStart + 9);
                    }
                }
                if (locationSearch.includes('brand=')) {
                    const posBrandStart = locationSearch.indexOf('brand=');
                    if (locationSearch.includes('&', posBrandStart)) {
                        const posCategoryEnd = locationSearch.indexOf('&', posBrandStart);
                        stringBrand = locationSearch.slice(posBrandStart + 6, posCategoryEnd);
                    } else {
                        stringBrand = locationSearch.slice(posBrandStart + 6);
                    }
                }
                if (locationSearch.includes('search=')) {
                    const posSearchStart = locationSearch.indexOf('search=');
                    if (locationSearch.includes('&', posSearchStart)) {
                        const posSearchEnd = locationSearch.indexOf('&', posSearchStart);
                        stringSearch = locationSearch.slice(posSearchStart + 7, posSearchEnd);
                    } else {
                        stringSearch = locationSearch.slice(posSearchStart + 7);
                    }
                }
                if (locationSearch.includes('sort=')) {
                    const posSortStart = locationSearch.indexOf('sort=');
                    if (locationSearch.includes('&', posSortStart)) {
                        const posSortEnd = locationSearch.indexOf('&', posSortStart);
                        stringSort = locationSearch.slice(posSortStart + 5, posSortEnd);
                    } else {
                        stringSort = locationSearch.slice(posSortStart + 5);
                    }
                }
                console.log('stringCategory', stringCategory);
                console.log('stringBrand', stringBrand);
                console.log('stringSearch', stringSearch);
                console.log('stringSort', stringSearch);
                const filter = {
                    categories: stringCategory === '' ? [] : stringCategory.split('_'),
                    brands: stringBrand === '' ? [] : stringBrand.split('_'),
                    minPrice: null,
                    maxPrice: null,
                    minStock: null,
                    maxStock: null,
                    search: stringSearch,
                    sort: stringSort,
                };
                handler(filter);
                console.log('bindLoadPage filter', filter);
            }
        });
    }

    renderPage(
        products: IProduct[],
        productsFiltered: IProduct[],
        filter: IFilterData,
        totalCost: number,
        numProducts: number
    ) {
        //отрисовка MainPage

        console.log('renderPage filter', filter);

        this.mainWrapper.innerHTML = '';
        const filters = displayFilter(products, filter, productsFiltered);
        const goods = displayCards(productsFiltered, filter);

        this.mainWrapper.append(filters, goods);
        (goods.querySelector('.search__input') as HTMLInputElement).focus();
    }
}
