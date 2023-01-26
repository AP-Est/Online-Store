import { View } from 'BaseView';
import { BaseModel } from 'BaseModel';
export class BaseController {
    view: View;
    model: BaseModel;
    constructor(view: View, model: BaseModel) {
        this.view = view;
        this.model = model;

        this.onChangeModel(this.model.totalCost, this.model.cartCount);
        this.view.bindUpdateData(this.handleUpdateData);

        this.model.bindChangeModel(this.onChangeModel);
    }
    onChangeModel = (totalCost: string, cartCount: string) => {
        this.view.displayBasePage(totalCost, cartCount);
    };

    handleUpdateData = () => this.model.handleUpdateData();
}
