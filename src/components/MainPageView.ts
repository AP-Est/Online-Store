import '../styles/styleMainPage.scss';
import { storeData } from '../data/data';
import { View } from './BaseView';
//import { ControllerMainPage } from 'MainPageController';

export class ViewMainPage extends View {
    app: HTMLElement | undefined;
    filters: HTMLElement;
    filters__wrapper: HTMLElement;
    goods: HTMLElement;
    top: HTMLElement;
    cards: HTMLElement;
    modelFilter1: HTMLElement;
    modelFilter1__name: HTMLElement;
    modelFilter1__main: HTMLElement;
    modelFilter1__text: HTMLElement;
    modelFilter2: HTMLElement;
    modelFilter2__name: HTMLElement;
    modelFilter2__main: HTMLElement;
    modelFilter2__text: HTMLElement;
    modelFilter3: HTMLElement;
    modelFilter3__name: HTMLElement;
    modelFilter3__main: HTMLElement;
    modelFilter3__text: HTMLElement;
    modelFilter4: HTMLElement;
    modelFilter4__name: HTMLElement;
    modelFilter4__main: HTMLElement;
    modelFilter4__text: HTMLElement;
    cardDiv: Array<HTMLElement>;

    constructor() {
        super();

        this.filters = this.createElement('div', 'filters');
        this.filters__wrapper = this.createElement('div', 'filters__wrapper');
        this.modelFilter1 = this.createElement('div', 'modelFilter');
        this.modelFilter1__name = this.createElement('div', 'modelFilter__name');
        this.modelFilter1__text = this.createElement('p', 'modelFilter__text');
        this.modelFilter1__text.textContent = 'Category';
        this.modelFilter1__main = this.createElement('div', 'modelFilter__main');

        this.modelFilter2 = this.createElement('div', 'modelFilter');
        this.modelFilter2__name = this.createElement('div', 'modelFilter__name');
        this.modelFilter2__text = this.createElement('p', 'modelFilter__text');
        this.modelFilter2__text.textContent = 'Brand';
        this.modelFilter2__main = this.createElement('div', 'modelFilter__main');

        this.modelFilter3 = this.createElement('div', 'modelFilter');
        this.modelFilter3__name = this.createElement('div', 'modelFilter__name');
        this.modelFilter3__text = this.createElement('p', 'modelFilter__text');
        this.modelFilter3__text.textContent = 'Price';
        this.modelFilter3__main = this.createElement('div', 'modelFilter__main');

        this.modelFilter4 = this.createElement('div', 'modelFilter');
        this.modelFilter4__name = this.createElement('div', 'modelFilter__name');
        this.modelFilter4__text = this.createElement('p', 'modelFilter__text');
        this.modelFilter4__text.textContent = 'Stock';
        this.modelFilter4__main = this.createElement('div', 'modelFilter__main');

        this.goods = this.createElement('div', 'goods');
        this.top = this.createElement('div', 'top');

        this.cards = this.createElement('div', 'cards');
        this.cardDiv = [];
        for (let i = 0; i < storeData.total; i++) {
            this.cardDiv[i] = this.createElement('div', 'cardDiv');
            this.cardDiv[i].style.background = `url(${storeData.products[i].thumbnail})`;
            this.cardDiv[i].style.backgroundSize = 'cover';
            this.cards.append(this.cardDiv[i]);
        }

        // собираем страницу
        this.modelFilter1__name.append(this.modelFilter1__text);
        this.modelFilter2__name.append(this.modelFilter2__text);
        this.modelFilter3__name.append(this.modelFilter3__text);
        this.modelFilter4__name.append(this.modelFilter4__text);
        this.modelFilter1.append(this.modelFilter1__name, this.modelFilter1__main);
        this.modelFilter2.append(this.modelFilter2__name, this.modelFilter2__main);
        this.modelFilter3.append(this.modelFilter3__name, this.modelFilter3__main);
        this.modelFilter4.append(this.modelFilter4__name, this.modelFilter4__main);
        this.filters__wrapper.append(this.modelFilter1, this.modelFilter2, this.modelFilter3, this.modelFilter4);
        this.filters.append(this.filters__wrapper);
        this.goods.append(this.top, this.cards);
        this.main__wrapper.append(this.filters, this.goods);
    }

    getElement(selector: string) {
        if (selector !== undefined && selector !== null) {
            const element = document.querySelector(selector) as HTMLElement;
            return element;
        }
    }

    createElement(tag: string, className?: string) {
        const element = document.createElement(tag);
        if (className) element.classList.add(className);

        return element;
    }

    bindAddDetailAdress(handler: any) {
        this.cards.addEventListener('click', () => {
            handler();
            const myEvent = new CustomEvent('myEvent');
            dispatchEvent(myEvent);
        });
    }
}
