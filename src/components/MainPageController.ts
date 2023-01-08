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
        this.view.bindChangeMinMaxPrice(this.handleChangeMinMaxPrice);
        this.view.bindChangeMinStock(this.handleChangeMinStock);
        this.view.bindChangeMaxStock(this.handleChangeMaxStock);
        this.view.bindSearch(this.handleSearch);
        this.view.bindSort(this.handleSort);
        //this.view.bindLoadPage(this.handleLoadPage);
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

    handleSearch = (searchString: string) => {
        this.model.addSearch(searchString);
    };

    handleSort = (sortString: string) => {
        this.model.addSort(sortString);
    };

    // handleLoadPage = (filter: IFilterData) => {
    //     this.model.addFilter(filter);
    // };

    handleChangeMinMaxPrice = (priceOne: number, priceTwo: number) => {
        this.model.changeMinMaxPrice(priceOne, priceTwo);
    };

    handleChangeMinStock = (minStock: number) => {
        this.model.changeMinStock(minStock);
    };

    handleChangeMaxStock = (maxStock: number) => {
        this.model.changeMaxStock(maxStock);
    };
}
