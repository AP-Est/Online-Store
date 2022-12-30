import { IProduct, storeData } from '../data/data';
import { CartPageView } from 'CartPageView';
import { CartPageModel } from 'CartPageModel';
import { ICartLots } from '../styles/types';

export class ControllerCartPage {
    view: CartPageView;
    model: CartPageModel;
    bindGetCartItems!: ICartLots;

    constructor(view: CartPageView, model: CartPageModel) {
        this.view = view;
        this.model = model;
        this.view.bindFlagOfPushIncrement(this.handleCardItemIncrement);
        this.view.bindFlagOfPushDecrement(this.handleCardItemDecrement);
        this.model.bindChangeModel(this.onChangeModel);

        //this.onChangeModel(this.model.cartData);
    }

    handleCardItemIncrement = (productId: number) => {
        this.model.handleCardItemIncrement(productId);
    };
    handleCardItemDecrement = (productId: number) => {
        this.model.handleCardItemDecrement(productId);
    };
    onChangeModel = (cartData: ICartLots[]) => {
        this.view.displayItemBlock(cartData);
        console.log();
    };
}
