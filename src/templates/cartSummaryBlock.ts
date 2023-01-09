import { ISumm } from '../styles/types';
import createButton from '../utils/createButton';
import createElement from '../utils/createElement';

export default function buildSummaryContent(summaryVars: ISumm) {
    const cartSummaryWrapper = createElement('div', 'cartSummaryBlock');
    const title = createSummaryTitle();
    const body = createSummaryBody(summaryVars);
    cartSummaryWrapper.append(title, body);
    return cartSummaryWrapper;
}

function createSummaryTitle() {
    const titleMainBlock = createElement('div', 'cartSummaryBlock__title');
    const titleText = createElement('span', 'cartSummaryTitle');
    titleText.textContent = 'Summary';
    titleMainBlock.append(titleText);
    return titleMainBlock;
}
function createSummaryBody(summaryVars: ISumm) {
    const bodyMainBlock = createElement('div', 'cartSummaryBlock__body');
    const count = createBodyBlockProductCount(summaryVars);
    const price = createBodyBlockPrice(summaryVars);
    const applyCodes = createBodyBlockAppliedCodes(summaryVars);
    const field = createBodyBlockCodeField();
    const button = createBodyBlockButton();
    const text = createElement('div', 'cartSummaryBlock__codes_text');
    text.textContent = 'Test codes: "AN" and "NA"';
    bodyMainBlock.append(count, price, applyCodes, text, field, button);
    return bodyMainBlock;
}

function createBodyBlockProductCount(summaryVars: ISumm) {
    const bodyBlockProductCount = createElement('div', 'cartSummaryBlock__ProductCount');
    const productCount = createElement('span', 'cartSummaryBlock__ProductCount_number');
    productCount.textContent = `Products: ${summaryVars.countItems}`;
    bodyBlockProductCount.append(productCount);
    return bodyBlockProductCount;
}

function createBodyBlockPrice(summaryVars: ISumm) {
    const bodyBlockPrice = createElement('div', 'cartSummaryBlock__Price');
    const priceTotal = createElement('div', 'cartSummaryBlock__Price_total');
    priceTotal.textContent = `Total: $${summaryVars.priceTotal}`;
    if (summaryVars.priceTotal !== summaryVars.priceWithCodes) {
        const priceWithCodes = createElement('div', 'cartSummaryBlock__Price_withCodes');
        priceTotal.classList.add('wrongPrice');
        priceWithCodes.textContent = `Discount: $${summaryVars.priceWithCodes}`;
        bodyBlockPrice.append(priceTotal, priceWithCodes);
    } else bodyBlockPrice.append(priceTotal);
    return bodyBlockPrice;
}

function createBodyBlockAppliedCodes(summaryVars: ISumm) {
    const bodyBlockAppliedCodes = createElement('div', 'cartSummaryBlock__AppliedCodes');
    if (summaryVars.codes.length === 0) {
        bodyBlockAppliedCodes.id = 'hideBlock';
    }
    const title = createElement('div', 'cartSummaryBlock__codes_title');
    title.textContent = `Applied Codes`;
    const codes = createCodesBlock(summaryVars);
    bodyBlockAppliedCodes.append(title, codes);
    return bodyBlockAppliedCodes;
}

function createBodyBlockCodeField() {
    const bodyBlockCodeField = createElement('div', 'cartSummaryBlock__CodeField');
    const inputArea = createElement('input', 'cartSummaryBlock__CodeField_input') as HTMLInputElement;
    inputArea.placeholder = 'Enter promo code';
    bodyBlockCodeField.append(inputArea);
    return bodyBlockCodeField;
}

function createBodyBlockButton() {
    const bodyBlockButton = createElement('div', 'cartSummaryBlock__Button');
    const button = createButton('BUY NOW', 'cartSummaryBlock__Button');
    bodyBlockButton.append(button);
    return bodyBlockButton;
}

function createCodesBlock(summaryVars: ISumm) {
    const bodyBlockAppliedCodesBody = createElement('div', 'cartAppliedCodes__body');
    const arr = summaryVars.codes;
    arr.map((obj) => {
        const codeWrapper = createElement('div', 'cartAppliedCodes__code');
        codeWrapper.classList.add(obj.title);
        const codeApply = createElement('div', 'cartAppliedCodes__body_code');
        codeApply.textContent = obj.description;
        const button = createButton('DROP', 'cartAppliedCodes__button_drop');
        button.id = obj.title;
        codeWrapper.append(codeApply, button);
        bodyBlockAppliedCodesBody.append(codeWrapper);
    });
    return bodyBlockAppliedCodesBody;
}
