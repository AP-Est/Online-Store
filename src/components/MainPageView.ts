import '../styles/styleMainPage.scss';
import { storeData } from '../data/data';
import { View } from './BaseView';
import createElement from '../modules/createElement';
//import { ControllerMainPage } from 'MainPageController';

export class MainPageView extends View {
    //app: HTMLElement | undefined;
    filters: HTMLElement;
    filtersWrapper: HTMLElement;
    goods: HTMLElement;
    top: HTMLElement;
    cards: HTMLElement;
    modelFilter1: HTMLElement;
    modelFilter1Name: HTMLElement;
    modelFilter1Main: HTMLElement;
    modelFilter1Text: HTMLElement;
    modelFilter2: HTMLElement;
    modelFilter2Name: HTMLElement;
    modelFilter2Main: HTMLElement;
    modelFilter2Text: HTMLElement;
    modelFilter3: HTMLElement;
    modelFilter3Name: HTMLElement;
    modelFilter3Main: HTMLElement;
    modelFilter3Text: HTMLElement;
    modelFilter4: HTMLElement;
    modelFilter4Name: HTMLElement;
    modelFilter4Main: HTMLElement;
    modelFilter4Text: HTMLElement;
    cardDiv: Array<HTMLElement>;

    constructor() {
        super();

        this.filters = createElement('div', 'filters');
        this.filtersWrapper = createElement('div', 'filters__wrapper');
        this.modelFilter1 = createElement('div', 'modelFilter');
        this.modelFilter1Name = createElement('div', 'modelFilter__name');
        this.modelFilter1Text = createElement('p', 'modelFilter__text');
        this.modelFilter1Text.textContent = 'Category';
        this.modelFilter1Main = createElement('div', 'modelFilter__main');

        this.modelFilter2 = createElement('div', 'modelFilter');
        this.modelFilter2Name = createElement('div', 'modelFilter__name');
        this.modelFilter2Text = createElement('p', 'modelFilter__text');
        this.modelFilter2Text.textContent = 'Brand';
        this.modelFilter2Main = createElement('div', 'modelFilter__main');

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
        this.modelFilter1Name.append(this.modelFilter1Text);
        this.modelFilter2Name.append(this.modelFilter2Text);
        this.modelFilter3Name.append(this.modelFilter3Text);
        this.modelFilter4Name.append(this.modelFilter4Text);
        this.modelFilter1.append(this.modelFilter1Name, this.modelFilter1Main);
        this.modelFilter2.append(this.modelFilter2Name, this.modelFilter2Main);
        this.modelFilter3.append(this.modelFilter3Name, this.modelFilter3Main);
        this.modelFilter4.append(this.modelFilter4Name, this.modelFilter4Main);
        this.filtersWrapper.append(this.modelFilter1, this.modelFilter2, this.modelFilter3, this.modelFilter4);
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
}
