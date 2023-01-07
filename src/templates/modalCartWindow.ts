import createButton from '../utils/createButton';
import createElement from '../utils/createElement';
import '../styles/styleModalWindow.scss';

export default function buildModalWindow() {
    const cartModalWindow = createElement('div', 'cartModalWindow');
    const dataBlock = createModalPersonalDataBlock();
    const cardBlock = createCartModalCreditCardBlock();
    const confirmButton = createCartModalConfirmButton();
    cartModalWindow.append(dataBlock, cardBlock, confirmButton);
    return cartModalWindow;
}
function createModalPersonalDataBlock() {
    const cartModalPersonalDataBlock = createElement('div', 'cartModalWindow__personalDataBlock');
    const titleText = createPersonalDataBlockTitle();
    const fields = createPersonalDataBlockFieldsBlock();
    cartModalPersonalDataBlock.append(titleText, fields);
    return cartModalPersonalDataBlock;
}
function createPersonalDataBlockTitle() {
    const personalDataBlockTitle = createElement('div', 'cartModalWindow__personalDataBlock');
    const titleText = createElement('span', 'personalDataBlock_title');
    titleText.textContent = 'Personal details';
    personalDataBlockTitle.append(titleText);
    return personalDataBlockTitle;
}
function createPersonalDataBlockFieldsBlock() {
    const personalDataBlockFieldsBlock = createElement('div', 'cartModalWindow__personalDataBlock');
    const nameField = createNameField();
    const phoneField = createPhoneField();
    const deliveryField = createDeliveryField();
    const mailField = createMailField();
    personalDataBlockFieldsBlock.append(nameField, phoneField, deliveryField, mailField);
    return personalDataBlockFieldsBlock;
}
function createNameField() {
    const nameField = createElement('form', 'personalDataBlock__nameField');
    const inputArea = createElement('input', 'personalDataBlock__nameField_input') as HTMLInputElement;
    inputArea.classList.add('personalInput');
    inputArea.placeholder = 'Name';
    const error = createElement('span', 'personalDataBlock_error');
    error.textContent = 'Error';
    error.style.display = 'none';
    nameField.append(inputArea, error);
    return nameField;
}
function createPhoneField() {
    const phoneField = createElement('form', 'personalDataBlock__phoneField');
    const inputArea = createElement('input', 'personalDataBlock__phoneField_input') as HTMLInputElement;
    inputArea.classList.add('personalInput');
    inputArea.placeholder = 'Phone number';
    const error = createElement('span', 'personalDataBlock_error');
    error.textContent = 'Error';
    error.style.display = 'none';
    phoneField.append(inputArea, error);
    return phoneField;
}
function createDeliveryField() {
    const deliveryField = createElement('div', 'personalDataBlock__deliveryField');
    const inputArea = createElement('input', 'personalDataBlock__deliveryField_input') as HTMLInputElement;
    inputArea.classList.add('personalInput');
    inputArea.placeholder = 'Delivery address';
    const error = createElement('span', 'personalDataBlock_error');
    error.textContent = 'Error';
    error.style.display = 'none';
    deliveryField.append(inputArea, error);
    return deliveryField;
}
function createMailField() {
    const mailField = createElement('form', 'personalDataBlock__mailField');
    const inputArea = createElement('input', 'personalDataBlock__mailField_input') as HTMLInputElement;
    inputArea.classList.add('personalInput');
    inputArea.placeholder = 'E-mail';
    const error = createElement('span', 'personalDataBlock_error');
    error.textContent = 'Error';
    error.style.display = 'none';
    mailField.append(inputArea, error);
    return mailField;
}

function createCartModalCreditCardBlock() {
    const cartModalCreditCardBlock = createElement('div', 'cartModalWindow__creditCardBlock');
    const creditCardTitle = createCreditCardBlockTitle();
    const creditCardBody = createCartModalCreditCardBlockBody();
    cartModalCreditCardBlock.append(creditCardTitle, creditCardBody);
    return cartModalCreditCardBlock;
}
function createCreditCardBlockTitle() {
    const createCreditCardBlockTitle = createElement('div', 'cartModalWindow__creditCardBlock_title');
    const titleText = createElement('span', 'cartSummaryTitle');
    titleText.textContent = 'Credit Card details';
    createCreditCardBlockTitle.append(titleText);
    return createCreditCardBlockTitle;
}
function createCartModalCreditCardBlockBody() {
    const createCartModalCreditCardBlockBody = createElement('div', 'creditCardBlockBody__wrapper');
    const cardModel = createCardModel();
    const cardErrors = createCartModalCreditCardBlockErrors();
    createCartModalCreditCardBlockBody.append(cardModel, cardErrors);
    return createCartModalCreditCardBlockBody;
}
function createCardModel() {
    const createCardModel = createElement('form', 'creditCardBlockBody__model');
    const inputAreaNumberDiv = createElement('div', 'creditCardBlockBody__div_inputCard');
    const inputAreaNumber = createElement('input', 'personalDataBlock__cardModel_inputCard') as HTMLInputElement;
    inputAreaNumber.placeholder = 'Card number';
    inputAreaNumberDiv.append(inputAreaNumber);
    const secondRow = createElement('div', 'creditCardBlockBody__model');
    const inputAreaValidDiv = createElement('div', 'creditCardBlockBody__div_inputValid');
    const inputAreaValid = createElement('input', 'personalDataBlock__cardModel_inputValid') as HTMLInputElement;
    inputAreaValid.placeholder = 'Valid Thru';
    inputAreaValidDiv.append(inputAreaValid);
    const inputAreaCVVDiv = createElement('div', 'creditCardBlockBody__div_inputCVV');
    const inputAreaCVV = createElement('input', 'personalDataBlock__cardModel_inputCVV') as HTMLInputElement;
    inputAreaCVV.placeholder = 'Code';
    inputAreaCVVDiv.append(inputAreaCVV);
    secondRow.append(inputAreaValidDiv, inputAreaCVVDiv);
    createCardModel.append(inputAreaNumberDiv, secondRow);
    return createCardModel;
}
function createCartModalCreditCardBlockErrors() {
    const createCartModalCreditCardBlockErrors = createElement('div', 'creditCardBlockBody__Errors');
    createCartModalCreditCardBlockErrors.style.display = 'none';
    //TODO тут нужно ловить ошибки
    //createCartModalCreditCardBlockErrors.append(cardModel);
    return createCartModalCreditCardBlockErrors;
}

function createCartModalConfirmButton() {
    const bodyBlockButton = createElement('div', 'cartModalBlock__button');
    const button = createButton('CONFIRM', 'cartModalBlock__button_confirm');
    bodyBlockButton.append(button);
    return bodyBlockButton;
}
