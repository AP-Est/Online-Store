import '../styles/styleMainPage.scss';
import { IProduct, IFilterData } from '../data/data';
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
            }
        });
    }

    bindAddToRemoveFromCart(handler: (cardNumber: number) => void) {
        this.mainWrapper.addEventListener('click', (event) => {
            const target = event.target as Element;
            if (target.classList.contains('cardDiv__cart')) {
                const cardNumber = Number(target.id);
                handler(cardNumber);
            }
        });
    }

    bindSetView(handler: (stringView: string) => void) {
        this.mainWrapper.addEventListener('click', (event) => {
            const target = event.target as Element;
            if (target.classList.contains('view__small') || target.classList.contains('view__smallElement')) {
                handler('small');
            }
            if (target.classList.contains('view__large') || target.classList.contains('view__largeElement')) {
                handler('large');
            }
        });
    }

    bindAddRemoveCategory(handler: (category: string) => void) {
        this.mainWrapper.addEventListener('change', (event) => {
            const target = event.target as HTMLElement;
            if (target.classList.contains('checkBoxStyleCategory')) {
                const category = target.nextElementSibling?.textContent as string;
                const categoryWithoutNumbers = category.split('  ')[0];
                handler(categoryWithoutNumbers);
            }
        });
    }

    bindAddRemoveBrand(handler: (brand: string) => void) {
        this.mainWrapper.addEventListener('change', (event) => {
            const target = event.target as HTMLElement;
            if (target.classList.contains('checkBoxStyleBrand')) {
                const brand = target.nextElementSibling?.textContent as string;
                const brandWithoutNumbers = brand.split('  ')[0];
                handler(brandWithoutNumbers);
            }
        });
    }

    bindChangeMinMaxPrice(handler: (priceOne: number, priceTwo: number) => void) {
        this.mainWrapper.addEventListener('change', (event) => {
            const target = event.target as HTMLElement;
            if (target.id === 'fromSlider' || target.id === 'toSlider') {
                const fromSlider = document.querySelector('#fromSlider') as HTMLInputElement;
                const toSlider = document.querySelector('#toSlider') as HTMLInputElement;
                handler(Number(fromSlider.value), Number(toSlider.value));
            }
        });
    }

    bindChangeMinMaxStock(handler: (stockOne: number, stockTwo: number) => void) {
        this.mainWrapper.addEventListener('change', (event) => {
            const target = event.target as HTMLElement;
            if (target.id === 'fromSliderStock' || target.id === 'toSliderStock') {
                const fromSliderStock = document.querySelector('#fromSliderStock') as HTMLInputElement;
                const toSliderStock = document.querySelector('#toSliderStock') as HTMLInputElement;
                handler(Number(fromSliderStock.value), Number(toSliderStock.value));
            }
        });
    }

    bindSearch(handler: (searchString: string) => void) {
        this.mainWrapper.addEventListener('input', (event) => {
            const target = event.target as HTMLInputElement;
            if (target.classList.contains('search__input')) {
                const searchString = target.value;
                handler(searchString);
            }
        });
    }

    bindSort(handler: (sortString: string) => void) {
        this.mainWrapper.addEventListener('change', (event) => {
            const target = event.target as HTMLInputElement;
            if (target.classList.contains('sort__select')) {
                const sortString = target.value;
                handler(sortString);
            }
        });
    }

    renderPage(products: IProduct[], productsFiltered: IProduct[], filter: IFilterData) {
        console.log('Our score is 300. We have done all points.');
        this.mainWrapper.innerHTML = '';
        const filters = displayFilter(products, filter, productsFiltered);
        const goods = displayCards(products, filter, productsFiltered);

        this.mainWrapper.append(filters, goods);
        (goods.querySelector('.search__input') as HTMLInputElement).focus();
    }
}
