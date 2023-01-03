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
                handler(category);
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
                const brand = target.nextElementSibling?.textContent as string;
                handler(brand);
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

    renderPage(
        products: IProduct[],
        productsFiltered: IProduct[],
        filter: IFilterData,
        totalCost: number,
        numProducts: number
    ) {
        //отрисовка MainPage

        console.log('renderPage');

        this.mainWrapper.innerHTML = '';
        const filters = displayFilter(products, filter, productsFiltered);
        const goods = displayCards(productsFiltered);

        this.mainWrapper.append(filters, goods);
    }
}
