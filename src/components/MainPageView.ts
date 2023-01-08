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

    bindChangeMinMaxPrice(handler: (priceOne: number, priceTwo: number) => void) {
        // обработчик изменения минимальной цены
        this.mainWrapper.addEventListener('change', (event) => {
            console.log('bindChangeMinPrice event', event);
            const target = event.target as HTMLElement;
            if (target.id === 'fromSlider' || target.id === 'toSlider') {
                console.log('bindChangeMinPrice second');
                const fromSlider = document.querySelector('#fromSlider') as HTMLInputElement;
                const toSlider = document.querySelector('#toSlider') as HTMLInputElement;
                handler(Number(fromSlider.value), Number(toSlider.value));
            }
        });
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
