import createButton from '../utils/createButton';
import createElement from '../utils/createElement';
import '../styles/styleModalWindow.scss';
import { IModalData } from '../styles/types';

export default function buildModalWindow(modalDate: IModalData) {
    const cartModalWindow = createElement('div', 'cartModalWindow');
    const dataBlock = createModalPersonalDataBlock(modalDate);
    const cardBlock = createCartModalCreditCardBlock(modalDate);
    const confirmButton = createCartModalConfirmButton();
    cartModalWindow.append(dataBlock, cardBlock, confirmButton);
    return cartModalWindow;
}
function createModalPersonalDataBlock(modalDate: IModalData) {
    const cartModalPersonalDataBlock = createElement('div', 'cartModalWindow__personalDataBlock');
    const titleText = createPersonalDataBlockTitle();
    const fields = createPersonalDataBlockFieldsBlock(modalDate);
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
function createPersonalDataBlockFieldsBlock(modalDate: IModalData) {
    const personalDataBlockFieldsBlock = createElement('div', 'cartModalWindow__personalDataBlock');
    const nameField = createNameField(modalDate);
    const phoneField = createPhoneField(modalDate);
    const deliveryField = createDeliveryField(modalDate);
    const mailField = createMailField(modalDate);
    personalDataBlockFieldsBlock.append(nameField, phoneField, deliveryField, mailField);
    return personalDataBlockFieldsBlock;
}

function createNameField(modalDate: IModalData) {
    const nameField = createElement('form', 'personalDataBlock__nameField');
    const inputArea = createElement('input', 'personalDataBlock__nameField_input') as HTMLInputElement;
    inputArea.classList.add('personalInput');
    inputArea.placeholder = 'Name';
    inputArea.type = 'text';
    inputArea.size = 30;
    inputArea.value = modalDate.name;
    const error = createElement('span', 'personalDataBlock_error');
    error.textContent = 'Error';
    if (modalDate.error.name === false) {
        error.style.display = 'none';
    }
    nameField.append(inputArea, error);
    return nameField;
}
function createPhoneField(modalDate: IModalData) {
    const phoneField = createElement('form', 'personalDataBlock__phoneField');
    const inputArea = createElement('input', 'personalDataBlock__phoneField_input') as HTMLInputElement;
    inputArea.classList.add('personalInput');
    inputArea.placeholder = 'Phone number';
    inputArea.type = 'text';
    inputArea.size = 12;
    inputArea.value = modalDate.phone;
    const error = createElement('span', 'personalDataBlock_error');
    error.textContent = 'Error';
    if (modalDate.error.phone === false) {
        error.style.display = 'none';
    }
    phoneField.append(inputArea, error);
    return phoneField;
}
function createDeliveryField(modalDate: IModalData) {
    const deliveryField = createElement('div', 'personalDataBlock__deliveryField');
    const inputArea = createElement('input', 'personalDataBlock__deliveryField_input') as HTMLInputElement;
    inputArea.classList.add('personalInput');
    inputArea.placeholder = 'Delivery address';
    inputArea.type = 'text';
    inputArea.size = 40;
    inputArea.value = modalDate.address;
    const error = createElement('span', 'personalDataBlock_error');
    error.textContent = 'Error';
    if (modalDate.error.address === false) {
        error.style.display = 'none';
    }
    deliveryField.append(inputArea, error);
    return deliveryField;
}
function createMailField(modalDate: IModalData) {
    const mailField = createElement('form', 'personalDataBlock__mailField');
    const inputArea = createElement('input', 'personalDataBlock__mailField_input') as HTMLInputElement;
    inputArea.classList.add('personalInput');
    inputArea.placeholder = 'E-mail';
    inputArea.type = 'text';
    inputArea.size = 20;
    inputArea.value = modalDate.mail;
    const error = createElement('span', 'personalDataBlock_error');
    error.textContent = 'Error';
    if (modalDate.error.mail === false) {
        error.style.display = 'none';
    }
    mailField.append(inputArea, error);
    return mailField;
}

function createCartModalCreditCardBlock(modalDate: IModalData) {
    const cartModalCreditCardBlock = createElement('div', 'cartModalWindow__creditCardBlock');
    const creditCardTitle = createCreditCardBlockTitle();
    const creditCardBody = createCartModalCreditCardBlockBody(modalDate);
    const cardErrors = createCartModalCreditCardBlockErrors(modalDate);
    cartModalCreditCardBlock.append(creditCardTitle, creditCardBody, cardErrors);
    return cartModalCreditCardBlock;
}
function createCreditCardBlockTitle() {
    const createCreditCardBlockTitle = createElement('div', 'cartModalWindow__creditCardBlock_title');
    const titleText = createElement('span', 'cartSummaryTitle');
    titleText.textContent = 'Credit Card details';
    createCreditCardBlockTitle.append(titleText);
    return createCreditCardBlockTitle;
}
function createCartModalCreditCardBlockBody(modalDate: IModalData) {
    const createCartModalCreditCardBlockBody = createElement('div', 'creditCardBlockBody__wrapper');
    const cardModel = createCardModel(modalDate);
    createCartModalCreditCardBlockBody.append(cardModel);
    return createCartModalCreditCardBlockBody;
}
function createCardModel(modalDate: IModalData) {
    const createCardModel = createElement('form', 'creditCardBlockBody__model');
    const inputAreaNumberDiv = createElement('div', 'creditCardBlockBody__div_inputCard');
    const inputAreaTypeOfPayment = createElement('container', 'creditCardBlockBody__cardModel_icon');
    const inputAreaTypeOfIcon = createElement('img', 'cardModel__icon') as HTMLImageElement;
    inputAreaTypeOfIcon.src = modalDate.cardType;
    inputAreaTypeOfPayment.append(inputAreaTypeOfIcon);
    const inputAreaNumber = createElement('input', 'personalDataBlock__cardModel_inputCard') as HTMLInputElement;
    inputAreaNumber.setAttribute('type', 'string');
    inputAreaNumber.size = 19;
    inputAreaNumber.setAttribute(
        'oninput',
        'if (value.length == 4 || value.length == 9 || value.length == 14) value = value + " "; if (value.length>= 20) value = value.slice (0,19)'
    );
    inputAreaNumber.placeholder = 'Card number';
    inputAreaNumber.value = String(modalDate.cardNumber);
    inputAreaNumberDiv.append(inputAreaTypeOfPayment, inputAreaNumber);
    const secondRow = createElement('div', 'creditCardBlockBody__model');
    const inputAreaValidDiv = createElement('div', 'creditCardBlockBody__div_inputValid');
    const inputAreaValid = createElement('input', 'personalDataBlock__cardModel_inputValid') as HTMLInputElement;
    inputAreaValid.setAttribute('type', 'string');
    inputAreaValid.size = 5;
    inputAreaValid.setAttribute(
        'oninput',
        'if (value.length == 2) value = value + "/"; if (value.length>= 6) value = value.slice (0,5)'
    );
    inputAreaValid.placeholder = 'Valid Thru';
    inputAreaValid.value = String(modalDate.cardValid);
    inputAreaValidDiv.append(inputAreaValid);
    const inputAreaCVVDiv = createElement('div', 'creditCardBlockBody__div_inputCVV');
    const inputAreaCVV = createElement('input', 'personalDataBlock__cardModel_inputCVV') as HTMLInputElement;
    inputAreaCVV.setAttribute('type', 'password');
    inputAreaCVV.size = 3;
    inputAreaCVV.placeholder = 'Code';
    inputAreaCVV.setAttribute('oninput', 'if (value.length>= 4) value = value.slice (0,3)');
    inputAreaCVVDiv.append(inputAreaCVV);
    secondRow.append(inputAreaValidDiv, inputAreaCVVDiv);
    createCardModel.append(inputAreaNumberDiv, secondRow);
    return createCardModel;
}

function createCartModalCreditCardBlockErrors(modalDate: IModalData) {
    const createCartModalCreditCardBlockErrors = createElement('div', 'creditCardBlockBody__Errors');
    if (modalDate.error.cardNumber === true || modalDate.error.cardValid === true || modalDate.error.cardCVV === true) {
        if (modalDate.error.cardNumber === true) {
            const cardNumberError = createElement('div', 'cardError');
            cardNumberError.textContent = 'Card number - error';
            createCartModalCreditCardBlockErrors.append(cardNumberError);
        }
        if (modalDate.error.cardValid === true) {
            const cardValidError = createElement('div', 'cardError');
            cardValidError.textContent = 'Card valid thru - error';
            createCartModalCreditCardBlockErrors.append(cardValidError);
        }
        if (modalDate.error.cardCVV === true) {
            const cardCVVError = createElement('div', 'cardError');
            cardCVVError.textContent = 'Card CVV - error';
            createCartModalCreditCardBlockErrors.append(cardCVVError);
        }
    }
    return createCartModalCreditCardBlockErrors;
}

function createCartModalConfirmButton() {
    const bodyBlockButton = createElement('div', 'cartModalBlock__button');
    const button = createButton('CONFIRM', 'cartModalBlock__button_confirm');
    bodyBlockButton.append(button);
    return bodyBlockButton;
}
