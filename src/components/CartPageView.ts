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
    cartLotCard!: HTMLElement;
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
    //cartArray: ICartLot[] = [];
    constructor() {
        super();
        NotANull();
        const cartArray: ICartLot[] = getCartItems();
        const product: IProduct[] = storeData.products;
        this.displayCartPage(cartArray, product);
    }
    //TODO TEЛO

    displayCartPage(cartArray: ICartLot[], product: IProduct[]) {
        this.createMainCartWrappers();
        this.createCartProductBlockBodyHeaderElements();
        this.createCartProductBlockBodyMainElements(cartArray, product);
        this.buildCartPage();
    }
    getDataById(id: number, product: IProduct[]) {
        return product.filter((obj) => obj.id === id).shift();
    }

    bindFlagOfPushIncrement(handler: (productId: number) => void) {
        this.itemCardCountCounterP.addEventListener('click', (event) => {
            const target = event.target as Element;
            console.log(target);
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
    buildCartPage() {
        this.productBlock.append(this.productBlockHeader, this.productBlockBody);
        this.cartWrapper.append(this.productBlock, this.summaryBlock);
        this.mainWrapper.append(this.cartWrapper);
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
    createCartProductBlockBodyMainElements(cartArray: ICartLot[], product: IProduct[]) {
        this.productBlockBody = createElement('div', 'cartProductBlock__body');
        this.createItemsBlock(cartArray, product);
    }
    createSummaryCartElements() {
        this.summaryBlockTitle = createElement('div', 'cartSummaryBlock__title');
        this.summaryBlockBody = createElement('div', 'cartSummaryBlock__body');
    }
    // displayItemBlock(cartArray: ICartLot[], product: IProduct[]) {
    //     this.productBlockBody.remove();
    //     this.productBlockBody = createElement('div', 'cartProductBlock__body');
    //     this.createItemsBlock(cartArray, product);
    //     this.productBlock.append(this.productBlockBody);
    // }
    createItemsBlock(cartArray: ICartLot[], product: IProduct[]) {
        cartArray.forEach((el, index) => {
            if (el != null) {
                this.cartLotCard = createElement('div', 'cart__lot');
                const cartItem = this.getDataById(el.id, product);
                if (cartItem) {
                    this.createItemCard(cartItem, el.count, index);
                }
                this.productBlockBody.append(this.cartLotCard);
            }
        });
    }

    createItemCard(cartItem: IProduct, count: number, numberID: number) {
        this.itemCardNum = createElement('div', `itemCardNum`);
        this.itemCardNum.innerText = `${numberID + 1}`; //TODO придумать как учесть плагинацию
        this.itemCardPic = createElement('div', `itemCardPic`);
        this.itemCardPic.classList.add('itemCardPic');
        this.itemCardPicExemplar = createElement('container', 'itemCardPic__Exemplar');
        this.itemCardPicExemplarPic = createElement('img', 'itemCardPic__Exemplar_Pic') as HTMLImageElement;
        this.itemCardPicExemplarPic.src = `${cartItem.thumbnail}`;
        this.itemCardPicExemplar.append(this.itemCardPicExemplarPic);
        this.itemCardPic.append(this.itemCardPicExemplar);

        this.itemCardData = createElement('div', `itemCardData`);
        this.itemCardDataHead = createElement('h3', `itemCardData__head`);
        this.itemCardDataHead.innerText = cartItem.title;
        this.itemCardDataDescr = createElement('h5', `itemCardData__description`);
        this.itemCardDataDescr.innerText = cartItem.description;
        this.itemCardDataR = createElement('span', `itemCardData__r`);
        this.itemCardDataR.innerText = `Rating: ${cartItem.rating}`;
        this.itemCardDataD = createElement('span', `itemCardData__d`);
        this.itemCardDataD.innerText = `Discount: ${cartItem.discountPercentage}%`;
        this.itemCardData.append(this.itemCardDataHead, this.itemCardDataDescr, this.itemCardDataR, this.itemCardDataD);

        this.itemCardCount = createElement('div', `itemCardCount`);
        this.itemCardCountStock = createElement('div', `itemCardCount__stock`);
        this.itemCardCountStock.innerText = `Stock:${cartItem.stock}`;
        this.itemCardCountCounter = createElement('div', `itemCardCount__counter`);
        this.itemCardCountCounterP = createElement('div', `itemCardCount__counterPlus`);
        this.itemCardCountCounterP.id = `${cartItem.id}`;
        this.itemCardCountCounterP.innerText = `+`;
        //this.itemCardCountCounterP.addEventListener('click', () => cardItemIncrement(product.id));
        this.itemCardCountCounterC = createElement('div', `itemCardCount__counterCount`);
        this.itemCardCountCounterC.innerText = `${count}`;
        this.itemCardCountCounterM = createElement('div', `itemCardCount__counterMinus`);
        this.itemCardCountCounterM.id = `${cartItem.id}`;
        this.itemCardCountCounterM.innerText = `-`;
        //this.itemCardCountCounterM.addEventListener('click', () => cardItemDecrement(product.id));
        this.itemCardCountCounter.append(
            this.itemCardCountCounterP,
            this.itemCardCountCounterC,
            this.itemCardCountCounterM
        );
        this.itemCardCountPrice = createElement('div', `itemCardCount__price`);
        this.itemCardCountPrice.innerText = `${cartItem.price}$`;
        this.itemCardCount.append(this.itemCardCountStock, this.itemCardCountCounter, this.itemCardCountPrice);

        this.cartLotCard?.append(this.itemCardNum, this.itemCardPic, this.itemCardData, this.itemCardCount);
    }
}
