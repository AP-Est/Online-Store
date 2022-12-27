import '../styles/styleMainPage.scss';
import { storeData } from '../data/data';
import { View } from './BaseView';
import createElement from '../modules/createElement';
import displayFilterCategory from '../modules/displayFilterCategory';
import displayFilterBrands from '../modules/displayFilterBrands';
import createButton from '../modules/createButton';
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
    modelFilter3Name: HTMLElement;
    modelFilter3Main: HTMLElement;
    modelFilter3Text: HTMLElement;
    modelFilter4: HTMLElement;
    modelFilter4Name: HTMLElement;
    modelFilter4Main: HTMLElement;
    modelFilter4Text: HTMLElement;
    cardDiv: Array<HTMLElement>;
    filtersButtonReset: HTMLButtonElement;
    filtersButtonCopy: HTMLButtonElement;
    filtersButtonWrapper: HTMLElement;

    constructor() {
        super();

        this.filters = createElement('div', 'filters');
        this.filtersWrapper = createElement('div', 'filters__wrapper');
        this.filtersButtonWrapper = createElement('div', 'filtersButton__wrapper');
        this.filtersButtonReset = createButton('Reset', 'filters__button_reset');
        this.filtersButtonCopy = createButton('Copy', 'filters__button_copy');
        this.modelFilter1 = displayFilterCategory() as HTMLElement;
        this.modelFilter2 = displayFilterBrands() as HTMLElement;

        this.modelFilter3 = createElement('div', 'modelFilter');
        this.modelFilter3Name = createElement('div', 'modelFilter__name');
        this.modelFilter3Text = createElement('p', 'modelFilter__text');
        this.modelFilter3Text.textContent = 'Price';
        this.modelFilter3Main = createElement('div', 'modelFilter__main');

        this.modelFilter4 = createElement('div', 'modelFilter');
        this.modelFilter4Name = createElement('div', 'modelFilter__name');
        this.modelFilter4Text = createElement('p', 'modelFilter__text');
        this.modelFilter4Text.textContent = 'Stock';
        this.modelFilter4Main = createElement('div', 'modelFilter__main');

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
        this.modelFilter3Name.append(this.modelFilter3Text);
        this.modelFilter4Name.append(this.modelFilter4Text);
        this.modelFilter3.append(this.modelFilter3Name, this.modelFilter3Main);
        this.modelFilter4.append(this.modelFilter4Name, this.modelFilter4Main);
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

    // bindChooseCategory(handler){
    //     this.category.addEventListener('change', event => {
    //         if (event.target.type === 'checkbox') {
    //             const category = ;

    //             handler(category);
    //         }
    //     })
    // }

    // bindChooseBrand(handler){
    //   this.category.addEventListener('change', event => {
    //       if (event.target.type === 'checkbox') {
    //           const brand = ;

    //           handler(brand);
    //       }
    //   })
    // }

    // bindSetPrice(handler){
    //   this.category.addEventListener('', event => {

    //           handler(parameter);

    //   })
    // }

    // bindSetStock(handler){
    //   this.category.addEventListener('', event => {

    //           handler(parameter);

    //   })
    // }

    displayProductCards(/*productsChanged*/) {
        //отрисовка карточек продуктов
    }

    // displayFilterBrands() {
    //     const filterBrandsWrapper = createElement('div', 'filterBrands__wrapper');
    //     const filterBrandsHeader = createElement('div', 'filterBrands__header');
    //     filterBrandsHeader.innerText = 'Brand';
    //     const filterBrandsArray = [...storeData.products];
    //     filterBrandsWrapper.append(filterBrandsHeader);
    //     for (let i = 0; i < filterBrandsArray.length; i++) {
    //         const filterBrandsPoint = createElement('span', `filterBrands__${filterBrandsArray[i].brand}`);
    //         const filterBrandsChBox = document.createElement('input');
    //         filterBrandsChBox.classList.add(`filterBrandsBox__${filterBrandsArray[i].brand}`);
    //         filterBrandsChBox.type = 'checkbox';
    //         filterBrandsPoint.textContent = filterBrandsArray[i].brand;
    //         filterBrandsWrapper.append(filterBrandsChBox, filterBrandsPoint);
    //     }
    //     return filterBrandsWrapper;
    // }

    displayFilterPrice(/*products, productsChanged*/) {
        //отрисовка фильтра Price
    }

    displayFilterStock(/*products, productsChanged*/) {
        //отрисовка фильтра Stock
    }
}
