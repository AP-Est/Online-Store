import '../styles/styleCartPage.scss';
import { IProduct, ICartLot, IPlug, ISumm, IModalData } from '../styles/types';
import { View } from './BaseView';
import createElement from '../utils/createElement';
import buildSummaryContent from '../templates/cartSummaryBlock';
import getElement from '../utils/getElement';
import buildModalWindow from '../templates/modalCartWindow';

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
    productBlockHeaderPlug!: HTMLElement;
    productBlockHeaderPlugLimit!: HTMLElement;
    productBlockHeaderPlugPageChanger!: HTMLElement;
    productBlockHeaderPlugLimitTitle!: HTMLElement;
    productBlockHeaderPlugPageChangerTitle!: HTMLElement;
    productBlockHeaderPlugPageChangerP!: HTMLElement;
    productBlockHeaderPlugPageChangerN!: HTMLElement;
    productBlockHeaderPlugPageChangerM!: HTMLElement;
    productBlockHeaderPlugPageChangerWrap!: HTMLElement;
    productBlockHeaderPlugLimitInput!: HTMLInputElement;
    constructor() {
        super();
    }
    displayCartPage(cartLots: ICartLot[], product: IProduct[], plug: IPlug, summaryVars: ISumm, modalDate: IModalData) {
        this.createMainCartWrappers(summaryVars);
        this.buildCartProductBlockHeader(plug);
        this.createCartProductBlockBodyMainElements(cartLots, product, plug);
        this.buildCartPage(summaryVars);
        if (modalDate.state == true) {
            const wrapper = getElement('.wrapper__blind') as HTMLElement;
            wrapper.style.display = 'flex';
            wrapper.innerHTML = '';
            wrapper.append(buildModalWindow(modalDate));
        } else {
            const wrapper = getElement('.wrapper__blind') as HTMLElement;
            wrapper.style.display = 'none';
        }
    }

    buildCartPage(summaryVars: ISumm) {
        if (summaryVars.countItems === 0) {
            const empty = this.createEmptyProductBlock();
            this.productBlock.append(this.productBlockHeader, empty);
        } else {
            this.productBlock.append(this.productBlockHeader, this.productBlockBody);
        }
        this.cartWrapper.append(this.productBlock, this.summaryBlock);
        this.mainWrapper.innerHTML = '';
        this.mainWrapper.append(this.cartWrapper);
    }
    buildCartProductBlockHeader(plug: IPlug) {
        this.createCartProductBlockBodyHeaderElements(plug);
        this.productBlockHeader.append(this.productBlockHeaderTitle, this.productBlockHeaderPlug);
    }
    createMainCartWrappers(summaryVars: ISumm) {
        this.cartWrapper = createElement('div', 'cart__wrapper');
        this.productBlock = createElement('div', 'cartProductBlock');
        this.summaryBlock = buildSummaryContent(summaryVars);
    }
    createEmptyProductBlock() {
        const emptyBlock = createElement('div', 'cartProductBlock__empty');
        emptyBlock.textContent = 'Cart is empty';
        return emptyBlock;
    }

    createCartProductBlockBodyHeaderElements(plug: IPlug) {
        this.createCartProductBlockBodyHeaderPlug(plug);
        this.productBlockHeader = createElement('div', 'cartProductBlock__header');
        this.productBlockHeaderTitle = createElement('span', 'cartProductBlock__header_title');
        this.productBlockHeaderTitle.innerText = 'Cart Products';
        this.productBlockHeaderPlug = createElement('form', 'cartProductBlock__plugWrapper');
        this.productBlockHeaderPlug.append(this.productBlockHeaderPlugLimit, this.productBlockHeaderPlugPageChanger);
    }
    createCartProductBlockBodyHeaderPlug(plug: IPlug) {
        this.productBlockHeaderPlugLimit = createElement('div', 'cartProductBlock__plugLimit');
        this.productBlockHeaderPlugLimitTitle = createElement('span', 'cartProductBlock__plugLimit_title');
        this.productBlockHeaderPlugLimitTitle.innerText = 'Limit:';
        this.productBlockHeaderPlugLimitInput = createElement('input') as HTMLInputElement;
        this.productBlockHeaderPlugLimitInput.classList.add('cartProductBlock__plugLimit_input');
        this.productBlockHeaderPlugLimitInput.setAttribute('type', 'number');
        this.productBlockHeaderPlugLimitInput.min = '1';
        this.productBlockHeaderPlugLimitInput.value = `${plug.limit}`;
        this.productBlockHeaderPlugPageChanger = createElement('div', 'cartProductBlock__plugPage');
        this.productBlockHeaderPlugPageChangerTitle = createElement('span', 'cartProductBlock__plugPage_title');
        this.productBlockHeaderPlugPageChangerTitle.innerText = 'Page:';
        this.productBlockHeaderPlugPageChangerWrap = createElement('div', 'plugPage__wrapper');
        this.productBlockHeaderPlugPageChangerM = createElement('div', 'plugPage__minusPage');
        this.productBlockHeaderPlugPageChangerM.innerText = '<';
        this.productBlockHeaderPlugPageChangerN = createElement('div', 'plugPage__page');
        this.productBlockHeaderPlugPageChangerN.innerText = `${plug.page}`;
        this.productBlockHeaderPlugPageChangerP = createElement('div', 'plugPage__plusPage');
        this.productBlockHeaderPlugPageChangerP.innerText = '>';
        this.productBlockHeaderPlugPageChangerWrap.append(
            this.productBlockHeaderPlugPageChangerM,
            this.productBlockHeaderPlugPageChangerN,
            this.productBlockHeaderPlugPageChangerP
        );
        this.productBlockHeaderPlugPageChanger.append(
            this.productBlockHeaderPlugPageChangerTitle,
            this.productBlockHeaderPlugPageChangerWrap
        );
        this.productBlockHeaderPlugLimit.append(
            this.productBlockHeaderPlugLimitTitle,
            this.productBlockHeaderPlugLimitInput
        );
    }
    createCartProductBlockBodyMainElements(cartLots: ICartLot[], product: IProduct[], plug: IPlug) {
        this.productBlockBody = createElement('div', 'cartProductBlock__body');
        this.createItemsBlock(cartLots, product, plug);
    }
    createSummaryCartElements() {
        this.summaryBlockTitle = createElement('div', 'cartSummaryBlock__title');
        this.summaryBlockBody = createElement('div', 'cartSummaryBlock__body');
    }

    createItemsBlock(cartLots: ICartLot[], product: IProduct[], plug: IPlug) {
        cartLots.forEach((el, index) => {
            if (el != null) {
                this.cartLotCard = createElement('div', 'cart__lot');
                const _cartItem = product.filter((obj) => obj.id === el.id).shift();
                if (_cartItem) {
                    this.createItemCard(_cartItem, el.count, index, plug);
                }
                this.productBlockBody.append(this.cartLotCard);
            }
        });
    }

    createItemCard(cartItem: IProduct, count: number, numberID: number, plug: IPlug) {
        this.itemCardNum = createElement('div', `itemCardNum`);
        this.itemCardNum.innerText = `${numberID + plug.startNumberID}`;
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
        this.itemCardDataRD = createElement('div', `itemCardData__rd`);
        this.itemCardDataR = createElement('span', `itemCardData__r`);
        this.itemCardDataR.innerText = `Rating: ${cartItem.rating}`;
        this.itemCardDataD = createElement('span', `itemCardData__d`);
        this.itemCardDataD.innerText = `Discount: ${cartItem.discountPercentage}%`;
        this.itemCardDataRD.append(this.itemCardDataR, this.itemCardDataD);
        this.itemCardData.append(this.itemCardDataHead, this.itemCardDataDescr, this.itemCardDataRD);

        this.itemCardCount = createElement('div', `itemCardCount`);
        this.itemCardCountStock = createElement('div', `itemCardCount__stock`);
        this.itemCardCountStock.innerText = `Stock:${cartItem.stock}`;
        this.itemCardCountCounter = createElement('div', `itemCardCount__counter`);
        this.itemCardCountCounterP = createElement('div', `itemCardCount__counterPlus`);
        this.itemCardCountCounterP.id = `${cartItem.id}`;
        this.itemCardCountCounterP.innerText = `+`;
        this.itemCardCountCounterC = createElement('div', `itemCardCount__counterCount`);
        this.itemCardCountCounterC.innerText = `${count}`;
        this.itemCardCountCounterM = createElement('div', `itemCardCount__counterMinus`);
        this.itemCardCountCounterM.id = `${cartItem.id}`;
        this.itemCardCountCounterM.innerText = `-`;
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
    bindFlagOfPushIncrement(handler: (productId: number) => void) {
        this.mainWrapper.addEventListener('click', (event) => {
            const target = event.target as Element;
            if (target.classList.contains('itemCardCount__counterPlus')) {
                const productId = Number(target.id);
                handler(productId);
            }
        });
    }
    bindFlagOfPushDecrement(handler: (productId: number) => void) {
        this.mainWrapper.addEventListener('click', (event) => {
            const target = event.target as Element;
            if (target.classList.contains('itemCardCount__counterMinus')) {
                const productId = Number(target.id);
                handler(productId);
            }
        });
    }

    bindFlagOfPageIncrement(handler: () => void) {
        this.mainWrapper.addEventListener('click', (event) => {
            const target = event.target as Element;
            if (target.classList.contains('plugPage__plusPage')) {
                handler();
            }
        });
    }
    bindFlagOfPageDecrement(handler: () => void) {
        this.mainWrapper.addEventListener('click', (event) => {
            const target = event.target as Element;
            if (target.classList.contains('plugPage__minusPage')) {
                handler();
            }
        });
    }
    bindLimitChange(handler: (limit: number) => void) {
        this.mainWrapper.addEventListener('change', (event) => {
            const target = event.target as HTMLInputElement;
            if (target.classList.contains('cartProductBlock__plugLimit_input')) {
                const limit = Number(target.value);
                handler(limit);
            }
        });
    }
    bindCodeEntrances(handler: (codeValue: string) => void) {
        this.mainWrapper.addEventListener('change', (event) => {
            const target = event.target as HTMLInputElement;
            if (target.classList.contains('cartSummaryBlock__CodeField_input')) {
                const codeValue = target.value;
                handler(codeValue);
            }
        });
    }
    bindCodeDrop(handler: (dropTitle: string) => void) {
        this.mainWrapper.addEventListener('click', (event) => {
            const target = event.target as HTMLButtonElement;
            if (target.classList.contains('cartAppliedCodes__button_drop')) {
                const dropTitle = target.id;
                handler(dropTitle);
            }
        });
    }
    bindOpenModalWindow(handler: () => void) {
        this.baseWrapper.addEventListener('click', (event) => {
            const target = event.target as HTMLButtonElement;
            if (target.classList.contains('cartSummaryBlock__Button')) {
                handler();
            }
        });
    }
    bindCloseModalWindow(handler: () => void) {
        this.baseWrapper.addEventListener('click', (event) => {
            const target = event.target as HTMLButtonElement;
            if (target.classList.contains('wrapper__blind')) {
                handler();
            }
        });
    }
    bindName(handler: (value: string) => void) {
        this.baseWrapper.addEventListener('change', (event) => {
            const target = event.target as HTMLInputElement;
            if (target.classList.contains('personalDataBlock__nameField_input')) {
                const value = target.value;
                handler(value);
            }
        });
    }
    bindPhone(handler: (value: string) => void) {
        this.baseWrapper.addEventListener('change', (event) => {
            const target = event.target as HTMLInputElement;
            if (target.classList.contains('personalDataBlock__phoneField_input')) {
                const value = target.value;
                handler(value);
            }
        });
    }
    bindAddress(handler: (value: string) => void) {
        this.baseWrapper.addEventListener('change', (event) => {
            const target = event.target as HTMLInputElement;
            if (target.classList.contains('personalDataBlock__deliveryField_input')) {
                const value = target.value;
                handler(value);
            }
        });
    }
    bindMail(handler: (value: string) => void) {
        this.baseWrapper.addEventListener('change', (event) => {
            const target = event.target as HTMLInputElement;
            if (target.classList.contains('personalDataBlock__mailField_input')) {
                const value = target.value;
                handler(value);
            }
        });
    }
    bindCardNumber(handler: (value: string) => void) {
        this.baseWrapper.addEventListener('change', (event) => {
            const target = event.target as HTMLInputElement;
            if (target.classList.contains('personalDataBlock__cardModel_inputCard')) {
                const value = target.value;
                handler(value);
            }
        });
    }
    bindCardValid(handler: (value: string) => void) {
        this.baseWrapper.addEventListener('change', (event) => {
            const target = event.target as HTMLInputElement;
            if (target.classList.contains('personalDataBlock__cardModel_inputValid')) {
                const value = target.value;
                handler(value);
            }
        });
    }
    bindCardCVV(handler: (value: string) => void) {
        this.baseWrapper.addEventListener('change', (event) => {
            const target = event.target as HTMLInputElement;
            if (target.classList.contains('personalDataBlock__cardModel_inputCVV')) {
                const value = target.value;
                handler(value);
            }
        });
    }
    bindConfirmButton(handler: () => void) {
        this.baseWrapper.addEventListener('click', (event) => {
            const target = event.target as HTMLButtonElement;
            if (target.classList.contains('cartModalBlock__button_confirm')) {
                handler();
            }
        });
    }
}
export function externalShowModal() {
    const button = getElement('.cartSummaryBlock__Button') as HTMLButtonElement;
    button.click();
}
