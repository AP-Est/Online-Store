import '../styles/styleCartPage.scss';
import { storeData } from '../data/data';
import { View } from './BaseView';
import createButton from '../utils/createButton';
import createElement from '../utils/createElement';
import pushToLocalStorage from '../utils/pushToLocalStorage';

export class CartPageView extends View {
    cartWrapper: HTMLElement;
    productBlock: HTMLElement;
    summaryBlock: HTMLElement;
    productBlockHeader: HTMLElement;
    productBlockBody: HTMLElement;
    summaryBlockTitle: HTMLElement;
    summaryBlockBody: HTMLElement;
    productBlockHeaderTitle: HTMLElement;
    constructor() {
        super();
        this.cartWrapper = createElement('div', 'cart__wrapper');
        this.productBlock = createElement('div', 'productBlock');
        this.summaryBlock = createElement('div', 'summaryBlock');

        this.productBlockHeader = createElement('div', 'productBlock__header');
        this.productBlockHeaderTitle = createElement('span', 'productBlock__header_title');
        //TODO сюда добавить плагинацию
        this.productBlockBody = createElement('div', 'productBlock__body');

        this.summaryBlockTitle = createElement('div', 'summaryBlock__title');
        this.summaryBlockBody = createElement('div', 'summaryBlock__body');

        //TODO собираем
        this.cartWrapper.append(this.productBlock, this.summaryBlock);
        this.mainWrapper.append(this.cartWrapper);
    }
}
