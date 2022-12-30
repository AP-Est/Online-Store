import { IProduct, storeData } from '../data/data';
import { CartPageView } from 'CartPageView';
import { CartPageModel } from 'CartPageModel';
import { ICartLot } from '../styles/types';

export class ControllerCartPage {
    view: CartPageView;
    model: CartPageModel;
    bindGetCartItems!: ICartLot;

    constructor(view: CartPageView, model: CartPageModel) {
        this.view = view;
        this.model = model;
        this.view.bindFlagOfPushIncrement(this.handleCardItemIncrement);
        this.view.bindFlagOfPushDecrement(this.handleCardItemDecrement);
        this.model.bindChangeModel(this.onChangeModel);

        //this.onChangeModel(this.model.cartLots, this.model.products);
    }

    handleCardItemIncrement = (productId: number) => {
        this.model.handleCardItemIncrement(productId);
    };
    handleCardItemDecrement = (productId: number) => {
        this.model.handleCardItemDecrement(productId);
    };
    onChangeModel = (cartLots: ICartLot[], products: IProduct[]) => {
        this.view.displayCartPage(cartLots, products);
    };
}
