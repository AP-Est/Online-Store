import '../styles/styleMainPage.scss';
import { IProduct, IFilterData, storeData } from '../data/data'; //TODO удалить storeData, когда это будет возможно
import { View } from './BaseView';
import createElement from '../utils/createElement';
import displayFilterCategory from '../utils/displayFilterCategory';
import displayFilterBrands from '../utils/displayFilterBrands';
import displaySliderPrice from '../utils/displaySliderPrice';
import createButton from '../utils/createButton';
//import { ControllerMainPage } from 'MainPageController';

export class MainPageView extends View {
    //app: HTMLElement | undefined;
    filters: HTMLElement;
    filtersWrapper: HTMLElement;
    goods: HTMLElement;
    top: HTMLElement;
    cards: HTMLElement;
    modelFilter1: HTMLElement;
    modelFilter2: HTMLElement;
    modelFilter3: HTMLElement;
    // modelFilter3Name: HTMLElement;
    // modelFilter3Main: HTMLElement;
    // modelFilter3Text: HTMLElement;
    modelFilter4: HTMLElement;
    //modelFilter4Name: HTMLElement;
    //modelFilter4Main: HTMLElement;
    //modelFilter4Text: HTMLElement;
    cardDiv: Array<HTMLElement>;
    filtersButtonReset: HTMLButtonElement;
    filtersButtonCopy: HTMLButtonElement;
    filtersButtonWrapper: HTMLElement;
    tempfilter: IFilterData;

    constructor() {
        super();
        //TODO: как будет проброс данных по фильтрам - следующий блок нужно убратьб пока можно тестить так
        this.tempfilter = {
            categories: [],
            brands: [],
            minPrice: null,
            maxPrice: null,
            minStock: null,
            maxStock: null,
            search: '',
            sort: '',
        };

        this.filters = createElement('div', 'filters');
        this.filtersWrapper = createElement('div', 'filters__wrapper');
        this.filtersButtonWrapper = createElement('div', 'filtersButton__wrapper');
        this.filtersButtonReset = createButton('Reset', 'filters__button_reset');
        this.filtersButtonCopy = createButton('Copy', 'filters__button_copy');
        this.modelFilter1 = displayFilterCategory(storeData.products, this.tempfilter) as HTMLElement; // TODo сюда прокинуть продукты и массив с фильтрами категорий
        //console.log(filter);
        this.modelFilter2 = displayFilterBrands(storeData.products, this.tempfilter) as HTMLElement; // TODo сюда прокинуть продукты и массив с фильтрами категорий

        this.modelFilter3 = displaySliderPrice(storeData.products, this.tempfilter) as HTMLElement;

        this.modelFilter4 = createElement('div', 'modelFilter');

        this.goods = createElement('div', 'goods');
        this.top = createElement('div', 'top');

        this.cards = createElement('div', 'cards');
        this.cardDiv = [];
        for (let i = 0; i < storeData.total; i++) {
            this.cardDiv[i] = createElement('div', 'cardDiv');
            this.cardDiv[i].style.background = `url(${storeData.products[i].thumbnail})`;
            this.cardDiv[i].style.backgroundSize = 'cover';
            this.cardDiv[i].id = `${i}`;
            this.cards.append(this.cardDiv[i]);
        }

        // собираем страницу
        this.filtersButtonWrapper.append(this.filtersButtonReset, this.filtersButtonCopy);
        this.filtersWrapper.append(
            this.filtersButtonWrapper,
            this.modelFilter1,
            this.modelFilter2,
            this.modelFilter3,
            this.modelFilter4
        );
        this.filters.append(this.filtersWrapper);
        this.goods.append(this.top, this.cards);
        this.mainWrapper.append(this.filters, this.goods);
    }

    bindAddDetailAddress(handler: (cardNumber: number) => void) {
        this.cards.addEventListener('click', (event) => {
            const target = event.target as Element;
            if (target.classList.contains('cardDiv')) {
                const cardNumber = Number(target.id);
                handler(cardNumber);
            }
        });
    }

    bindAddRemoveCategory(handler: (category: string) => void) {
        // обработчик выбора новой категории

        this.modelFilter1.addEventListener('change', (event) => {
            const target = event.target as HTMLElement;
            if (target.classList.contains('checkBoxStyle')) {
                //console.log('target.classList bindAddCategory', target.classList);
                const category = target.nextElementSibling?.textContent as string;
                handler(category);
            }
            //console.log('bindAddCategory modelFilter end:', this.modelFilter1);
        });
        // //console.log('bindAddCategory');
    }

    // bindRemoveCategory(handler: (category: string) => void) {
    //     //console.log(' bindRemoveCategory this.modelFilter1', this.modelFilter1);
    //     this.modelFilter1.addEventListener('change', (event) => {
    //         const target = event.target as HTMLInputElement;
    //         if (target.classList.contains('checked')) {
    //             console.log('bindRemoveCategory');
    //             const category = target.nextElementSibling?.textContent as string;
    //             handler(category);
    //             target.classList.remove('checked');
    //             console.log('target.classList bindRemoveCategory', target.classList);
    //             event.stopPropagation();
    //         }
    //     });
    // }
    // bindAddCategory(handler: (category: string) => void) {
    //     // обработчик выбора новой категории

    //     this.category.addEventListener('change', event => {
    //         if (event.target.type === 'checkbox') {
    //             const category = ;

    //             handler(category);
    //         }
    //     })
    //     handler('category');
    // }

    bindRemoveBrand(handler: (brand: string) => void) {
        // обработчик удаления бренда
        // this.category.addEventListener('change', event => {
        //     if (event.target.type === 'checkbox') {
        //         const category = ;
        //         handler(category);
        //     }
        // })
        //handler('brand');
    }

    bindAddBrand(handler: (brand: string) => void) {
        this.modelFilter2.addEventListener('change', (event) => {
            const target = event.target as HTMLElement;
            if (target.classList.contains('checkBoxStyle')) {
                const category = target.nextElementSibling?.textContent as string;
                handler(category);
                //console.log(`bindAddBrand category: ${category}`);
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

        const filterCategoryChBox = document.querySelectorAll('.filterCategoryBox');
        const filterCategoryChBoxLabel = document.querySelectorAll('.filterCategoryBoxLabel');
        filterCategoryChBox.forEach((item, index) => {
            // console.log(index);
            (filterCategoryChBox[index] as HTMLInputElement).checked = false;
            filterCategoryChBoxLabel[index].classList.remove('checked');
            const title = filterCategoryChBoxLabel[index].textContent as string;
            if (filter.categories.includes(title)) {
                (filterCategoryChBox[index] as HTMLInputElement).checked = true;
                filterCategoryChBoxLabel[index].classList.add('checked');
                //console.log(filterCategoryChBoxLabel);
            }
        });
    }
}
