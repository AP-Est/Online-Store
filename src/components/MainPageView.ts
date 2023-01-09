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
            if (target.classList.contains('cardDiv__details')) {
                const cardNumber = Number(target.id);
                //console.log('bindAddDetailAddress target.nextElementSibling:', target.id);
                handler(cardNumber);
            }
        });
    }

    bindResetFilters(handler: () => void) {
        this.mainWrapper.addEventListener('click', (event) => {
            const target = event.target as Element;
            if (target.classList.contains('filters__button_reset')) {
                handler();
            }
        });
    }

    bindCopyAddress() {
        this.mainWrapper.addEventListener('click', (event) => {
            const target = event.target as Element;
            if (target.classList.contains('filters__button_copy')) {
                navigator.clipboard.writeText(window.location.href);
                const styleButtonCopy = document.querySelector('.filters__button_copy');
                (styleButtonCopy as HTMLElement).textContent = 'Copied!';
                setTimeout(() => {
                    (styleButtonCopy as HTMLElement).textContent = 'Copy';
                }, 1000);
                //handler();
            }
        });
    }

    bindAddToRemoveFromCart(handler: (cardNumber: number) => void) {
        this.mainWrapper.addEventListener('click', (event) => {
            const target = event.target as Element;
            if (target.classList.contains('cardDiv__cart')) {
                const cardNumber = Number(target.id);
                //console.log('bindAddDetailAddress target.nextElementSibling:', target.id);
                handler(cardNumber);
            }
        });
    }

    bindSetView(handler: (stringView: string) => void) {
        this.mainWrapper.addEventListener('click', (event) => {
            const target = event.target as Element;
            console.log('bindSetView target', target);
            if (target.classList.contains('view__small') || target.classList.contains('view__smallElement')) {
                handler('small');
                console.log('bindSetView view__small');
            }
            if (target.classList.contains('view__large') || target.classList.contains('view__largeElement')) {
                handler('large');
                console.log('bindSetView view__large');
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

    bindChangeMinMaxPrice(handler: (priceOne: number, priceTwo: number) => void) {
        // обработчик изменения минимальной цены
        this.mainWrapper.addEventListener('change', (event) => {
            //console.log('bindChangeMinPrice event', event);
            const target = event.target as HTMLElement;
            if (target.id === 'fromSlider' || target.id === 'toSlider') {
                //console.log('bindChangeMinPrice second');
                const fromSlider = document.querySelector('#fromSlider') as HTMLInputElement;
                const toSlider = document.querySelector('#toSlider') as HTMLInputElement;
                handler(Number(fromSlider.value), Number(toSlider.value));
            }
        });
    }

    bindChangeMinMaxStock(handler: (stockOne: number, stockTwo: number) => void) {
        // обработчик изменения минимальной цены
        this.mainWrapper.addEventListener('change', (event) => {
            //console.log('bindChangeMinPrice event', event);
            const target = event.target as HTMLElement;
            if (target.id === 'fromSliderStock' || target.id === 'toSliderStock') {
                //console.log('bindChangeMinPrice second');
                const fromSliderStock = document.querySelector('#fromSliderStock') as HTMLInputElement;
                const toSliderStock = document.querySelector('#toSliderStock') as HTMLInputElement;
                handler(Number(fromSliderStock.value), Number(toSliderStock.value));
            }
        });
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
        console.log('renderPage productsFiltered', productsFiltered);

        this.mainWrapper.append(filters, goods);
        (goods.querySelector('.search__input') as HTMLInputElement).focus();
    }
}
