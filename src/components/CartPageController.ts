import { CartPageView } from 'CartPageView';
import { CartPageModel } from 'CartPageModel';
import { ICartLot, IProduct, IPlug } from '../styles/types';

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
        this.model.bindChangeModel(this.onChangeModel);

        this.onChangeModel(this.model.cartView, this.model.products, this.model.plug);
    }

    onChangeModel = (cartLots: ICartLot[], products: IProduct[], plug: IPlug) => {
        this.view.displayCartPage(cartLots, products, plug);
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
}
