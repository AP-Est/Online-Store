import '../styles/styleCartPage.scss';
import { IProduct, storeData } from '../data/data';
import { View } from './BaseView';
import createButton from '../utils/createButton';
import createElement from '../utils/createElement';
import pushToLocalStorage from '../utils/pushToLocalStorage';
import getCartItems from '../utils/getCartItems';
import { ICartLot } from '../styles/types';
import cardItemIncrement from '../utils/cardItemIncrement';
import cardItemDecrement from '../utils/cardItemDecrement';
import NotANull from '../utils/notANull';

export class CartPageView extends View {
    cartWrapper!: HTMLElement;
    productBlock!: HTMLElement;
    summaryBlock!: HTMLElement;
    productBlockHeader!: HTMLElement;
    productBlockBody!: HTMLElement;
    summaryBlockTitle!: HTMLElement;
    summaryBlockBody!: HTMLElement;
    productBlockHeaderTitle!: HTMLElement;
    cartLot!: HTMLElement;
    itemCardNum!: HTMLElement;
    itemCardPic!: HTMLElement;
    itemCardData!: HTMLElement;
    itemCardCount!: HTMLElement;
    itemCardDataRD!: HTMLElement;
    itemCardDataHead!: HTMLElement;
    itemCardDataDescr!: HTMLElement;
    itemCardCountStock!: HTMLElement;
    itemCardCountCounter!: HTMLElement;
    itemCardCountPrice!: HTMLElement;
    itemCardCountCounterP!: HTMLElement;
    itemCardCountCounterC!: HTMLElement;
    itemCardCountCounterM!: HTMLElement;
    itemCardPicExemplar!: HTMLElement;
    itemCardPicExemplarPic!: HTMLImageElement;
    itemCardDataR!: HTMLElement;
    itemCardDataD!: HTMLElement;
    constructor() {
        super();
        NotANull();
        //let cartArray: ICartLot[] = ()
        this.createMainCartWrappers();
        this.createCartProductBlockBodyHeaderElements();
        this.createSummaryCartElements();
        //TODO А тут живет прототип функции отрисовки и обновления данных
        // this.mainWrapper.addEventListener('click', () => {
        //     this.displayItemBlock();
        // });
        //TODO собираем
        this.buildCartPage();
    }

    buildCartPage() {
        this.productBlock.append(this.productBlockHeader, this.productBlockBody);
        this.cartWrapper.append(this.productBlock, this.summaryBlock);
        this.mainWrapper.append(this.cartWrapper);
    }
    createSummaryCartElements() {
        this.summaryBlockTitle = createElement('div', 'cartSummaryBlock__title');
        this.summaryBlockBody = createElement('div', 'cartSummaryBlock__body');
    }
    createMainCartWrappers() {
        this.cartWrapper = createElement('div', 'cart__wrapper');
        this.productBlock = createElement('div', 'cartProductBlock');
        this.summaryBlock = createElement('div', 'cartSummaryBlock');
    }

    createCartProductBlockBodyHeaderElements() {
        this.productBlockHeader = createElement('div', 'cartProductBlock__header');
        this.productBlockHeaderTitle = createElement('span', 'cartProductBlock__header_title');
        //TODO сюда добавить плагинацию
    }
    createCartProductBlockBodyMainElements() {
        this.productBlockBody = createElement('div', 'cartProductBlock__body');
        const cartArray: ICartLot[] = getCartItems();
        this.createItemsBlock(cartArray);
    }
    bindFlagOfPushIncrement(handler: (productId: number) => void) {
        this.itemCardCountCounterP.addEventListener('click', (event) => {
            const target = event.target as Element;
            if (target.classList.contains('itemCardCount__counterPlus')) {
                const productId = Number(target.id);
                handler(productId);
            }
        });
    }
    bindFlagOfPushDecrement(handler: (productId: number) => void) {
        this.itemCardCountCounterM.addEventListener('click', (event) => {
            const target = event.target as Element;
            if (target.classList.contains('itemCardCount__counterMinus')) {
                const productId = Number(target.id);
                handler(productId);
            }
        });
    }

    displayItemBlock() {
        let cartArray: ICartLot[] = getCartItems();
        this.productBlockBody.remove();
        this.productBlockBody = createElement('div', 'cartProductBlock__body');
        cartArray = getCartItems();
        this.createItemsBlock(cartArray);
        this.productBlock.append(this.productBlockBody);
    }
    createItemsBlock(cartArray: ICartLot[]) {
        cartArray.forEach((el, index) => {
            if (el != null) {
                this.cartLot = createElement('div', 'cart__lot');
                const cartItem = this.getDataById(el.id);
                if (cartItem) {
                    this.createItemCard(cartItem, el.count, index);
                }
                this.productBlockBody.append(this.cartLot);
            }
        });
    }
    getDataById(id: number) {
        return storeData.products.filter((obj) => obj.id === id).shift();
    }
    createItemCard(product: IProduct, count: number, numberID: number) {
        this.itemCardNum = createElement('div', `itemCardNum`);
        this.itemCardNum.innerText = `${numberID + 1}`; //TODO придумать как учесть плагинацию
        this.itemCardPic = createElement('div', `itemCardPic`);
        this.itemCardPic.classList.add('itemCardPic');
        this.itemCardPicExemplar = createElement('container', 'itemCardPic__Exemplar');
        this.itemCardPicExemplarPic = createElement('img', 'itemCardPic__Exemplar_Pic') as HTMLImageElement;
        this.itemCardPicExemplarPic.src = `${product.thumbnail}`;
        this.itemCardPicExemplar.append(this.itemCardPicExemplarPic);
        this.itemCardPic.append(this.itemCardPicExemplar);

        this.itemCardData = createElement('div', `itemCardData`);
        this.itemCardDataHead = createElement('h3', `itemCardData__head`);
        this.itemCardDataHead.innerText = product.title;
        this.itemCardDataDescr = createElement('h5', `itemCardData__description`);
        this.itemCardDataDescr.innerText = product.description;
        this.itemCardDataR = createElement('span', `itemCardData__r`);
        this.itemCardDataR.innerText = `Rating: ${product.rating}`;
        this.itemCardDataD = createElement('span', `itemCardData__d`);
        this.itemCardDataD.innerText = `Discount: ${product.discountPercentage}%`;
        this.itemCardData.append(this.itemCardDataHead, this.itemCardDataDescr, this.itemCardDataR, this.itemCardDataD);

        this.itemCardCount = createElement('div', `itemCardCount`);
        this.itemCardCountStock = createElement('div', `itemCardCount__stock`);
        this.itemCardCountStock.innerText = `Stock:${product.stock}`;
        this.itemCardCountCounter = createElement('div', `itemCardCount__counter`);
        this.itemCardCountCounterP = createElement('div', `itemCardCount__counterPlus`);
        this.itemCardCountCounterP.id = `${product.id}`;
        this.itemCardCountCounterP.innerText = `+`;
        //this.itemCardCountCounterP.addEventListener('click', () => cardItemIncrement(product.id));
        this.itemCardCountCounterC = createElement('div', `itemCardCount__counterCount`);
        this.itemCardCountCounterC.innerText = `${count}`;
        this.itemCardCountCounterM = createElement('div', `itemCardCount__counterMinus`);
        this.itemCardCountCounterM.id = `${product.id}`;
        this.itemCardCountCounterM.innerText = `-`;
        //this.itemCardCountCounterM.addEventListener('click', () => cardItemDecrement(product.id));
        this.itemCardCountCounter.append(
            this.itemCardCountCounterP,
            this.itemCardCountCounterC,
            this.itemCardCountCounterM
        );
        this.itemCardCountPrice = createElement('div', `itemCardCount__price`);
        this.itemCardCountPrice.innerText = `${product.price}$`;
        this.itemCardCount.append(this.itemCardCountStock, this.itemCardCountCounter, this.itemCardCountPrice);

        this.cartLot?.append(this.itemCardNum, this.itemCardPic, this.itemCardData, this.itemCardCount);
    }
}
