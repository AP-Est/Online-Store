import { MainPageView } from 'MainPageView';
import { MainPageModel } from 'MainPageModel';
import { IProduct, IFilterData } from '../data/data';

export class ControllerMainPage {
    view: MainPageView;
    model: MainPageModel;

    constructor(view: MainPageView, model: MainPageModel) {
        //console.log('constructor controller');
        // console.log(`test ${this.onChangeModel}`);
        // console.log(this);
        this.view = view;
        this.model = model;
        this.onChangeModel(this.model.products, this.model.filter, 0, 0); //TODO 0, 0 временно, далее доработать логику и заменить переменными
        this.model.bindChangeModel(this.onChangeModel);
        this.view.bindAddDetailAddress(this.handleAddDetailAddress);
        //this.view.bindRemoveCategory(this.handleRemoveCategory);
        this.view.bindAddRemoveCategory(this.handleAddRemoveCategory);
        this.view.bindAddRemoveBrand(this.handleAddRemoveBrand);
        this.view.bindChangeMinPrice(this.handleChangeMinPrice);
        this.view.bindChangeMaxPrice(this.handleChangeMaxPrice);
        this.view.bindChangeMinStock(this.handleChangeMinStock);
        this.view.bindChangeMaxStock(this.handleChangeMaxStock);
    }

    handleAddDetailAddress = (cardNumber: number) => {
        window.location.hash = `details/${cardNumber + 1}`;
    };

    onChangeModel = (products: IProduct[], filter: IFilterData, totalCost: number, numProducts: number) => {
        this.view.renderPage(products, this.model.getProductsToShow(products, filter), filter, totalCost, numProducts);
    };

    handleAddRemoveCategory = (category: string) => {
        this.model.addRemoveCategory(category);
    };

    handleAddRemoveBrand = (brand: string) => {
        this.model.addRemoveBrand(brand);
    };

    handleChangeMinPrice = (minPrice: number) => {
        this.model.changeMinPrice(minPrice);
    };

    handleChangeMaxPrice = (maxPrice: number) => {
        this.model.changeMaxPrice(maxPrice);
    };

    handleChangeMinStock = (minStock: number) => {
        this.model.changeMinStock(minStock);
    };

    handleChangeMaxStock = (maxStock: number) => {
        this.model.changeMaxPrice(maxStock);
    };
}
