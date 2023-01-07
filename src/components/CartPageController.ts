import { CartPageView } from 'CartPageView';
import { CartPageModel } from 'CartPageModel';
import { ICartLot, IProduct, IPlug, ISumm, IModalData } from '../styles/types';

export class ControllerCartPage {
    view: CartPageView;
    model: CartPageModel;

    constructor(view: CartPageView, model: CartPageModel) {
        this.view = view;
        this.model = model;
        this.view.bindFlagOfPushIncrement(this.handleCardItemIncrement);
        this.view.bindFlagOfPushDecrement(this.handleCardItemDecrement);
        this.view.bindFlagOfPageIncrement(this.handleCardPageIncrement);
        this.view.bindFlagOfPageDecrement(this.handleCardPageDecrement);
        this.view.bindLimitChange(this.handleLimitChange);
        this.view.bindCodeEntrances(this.handleCodeEntrances);
        this.view.bindCodeDrop(this.handleCodeDrop);
        this.view.bindOpenModalWindow(this.handleOpenModalWindow);
        this.view.bindCloseModalWindow(this.handleCloseModalWindow);

        this.view.bindName(this.handleName);
        this.view.bindPhone(this.handlePhone);
        this.view.bindAddress(this.handleAddress);
        this.view.bindMail(this.handleMail);
        this.view.bindCardNumber(this.handleCardNumber);
        this.view.bindCardValid(this.handleCardValid);
        this.view.bindCardCVV(this.handleCardCVV);
        this.view.bindConfirmButton(this.handleConfirmButton);

        this.model.bindChangeModel(this.onChangeModel);

        this.onChangeModel(
            this.model.cartView,
            this.model.products,
            this.model.plug,
            this.model.summaryVars,
            this.model.modalDate
        );
    }
    onChangeModel = (
        cartLots: ICartLot[],
        products: IProduct[],
        plug: IPlug,
        summaryVars: ISumm,
        modalDate: IModalData
    ) => {
        this.view.displayCartPage(cartLots, products, plug, summaryVars, modalDate);
    };

    handleCardItemIncrement = (productId: number) => {
        this.model.handleCardItemIncrement(productId);
    };
    handleCardItemDecrement = (productId: number) => {
        this.model.handleCardItemDecrement(productId);
    };
    handleCardPageIncrement = () => this.model.handlePageIncrement();

    handleCardPageDecrement = () => this.model.handlePageDecrement();

    handleLimitChange = (limit: number) => {
        this.model.handleLimitChanged(limit);
    };
    handleCodeEntrances = (codeValue: string) => {
        this.model.handleCodeEntrances(codeValue);
    };
    handleCodeDrop = (dropTitle: string) => {
        this.model.handleCodeDrop(dropTitle);
    };
    handleOpenModalWindow = () => this.model.handleOpenModalWindow();
    handleCloseModalWindow = () => this.model.handleCloseModalWindow();

    handleName = (value: string) => this.model.handleName(value);
    handlePhone = (value: string) => this.model.handlePhone(value);
    handleAddress = (value: string) => this.model.handleAddress(value);
    handleMail = (value: string) => this.model.handleMail(value);
    handleCardNumber = (value: string) => this.model.handleCardNumber(value);
    handleCardValid = (value: string) => this.model.handleCardValid(value);
    handleCardCVV = (value: string) => this.model.handleCardCVV(value);
    handleConfirmButton = () => this.model.handleConfirmButton();
}
