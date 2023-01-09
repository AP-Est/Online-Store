import { DetailPageView } from 'DetailPageView';
import { IStoreData } from '../styles/types';
import { DetailPageModel } from './DetailPageModel';
export class DetailPageController {
    view: DetailPageView;
    model: DetailPageModel;
    constructor(view: DetailPageView, model: DetailPageModel) {
        this.view = view;
        this.model = model;

        this.view.bindPushToLocalStorage(this.handlePushToLocalStorage);
        this.view.bindDropFromLocalStorage(this.handleDropFromLocalStorage);
        this.view.bindFastBuy(this.handleFastBuy);
        this.model.bindChangeModel(this.onChangeModel);

        this.onChangeModel(this.model.storeData);
    }

    onChangeModel = (storeData: IStoreData) => {
        this.view.displayDetailPage(storeData);
    };

    handlePushToLocalStorage = (itemId: number) => this.model.handlePushToLocalStorage(itemId);
    handleDropFromLocalStorage = (itemId: number) => this.model.handleDropFromLocalStorage(itemId);
    handleFastBuy = (itemId: number) => this.model.handleFastBuy(itemId);
}
