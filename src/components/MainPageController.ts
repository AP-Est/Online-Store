import { MainPageView } from 'MainPageView';
import { MainPageModel } from 'MainPageModel';
import { IProduct, IFilterData } from '../data/data';

export class ControllerMainPage {
    view: MainPageView;
    model: MainPageModel;

    constructor(view: MainPageView, model: MainPageModel) {
        this.view = view;
        this.model = model;
        this.onChangeModel(this.model.products, this.model.filter);
        this.model.bindChangeModel(this.onChangeModel);
        this.view.bindResetFilters(this.handleResetFilters);
        this.view.bindCopyAddress();
        this.view.bindAddDetailAddress(this.handleAddDetailAddress);
        this.view.bindAddToRemoveFromCart(this.handleAddToRemoveFromCart);
        this.view.bindSetView(this.handleSetView);
        this.view.bindAddRemoveCategory(this.handleAddRemoveCategory);
        this.view.bindAddRemoveBrand(this.handleAddRemoveBrand);
        this.view.bindChangeMinMaxPrice(this.handleChangeMinMaxPrice);
        this.view.bindChangeMinMaxStock(this.handleChangeMinMaxStock);
        this.view.bindSearch(this.handleSearch);
        this.view.bindSort(this.handleSort);
    }

    handleAddDetailAddress = (cardNumber: number) => {
        window.location.hash = `details/${cardNumber + 1}`;
    };

    handleResetFilters = () => {
        this.model.resetFilters();
    };

    handleAddToRemoveFromCart = (cardNumber: number) => {
        this.model.addToRemoveFromCart(cardNumber + 1);
    };

    handleSetView = (stringView: string) => {
        this.model.addSetView(stringView);
    };

    onChangeModel = (products: IProduct[], filter: IFilterData) => {
        this.view.renderPage(products, this.model.getProductsToShow(products, filter), filter);
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

    handleChangeMinMaxPrice = (priceOne: number, priceTwo: number) => {
        this.model.changeMinMaxPrice(priceOne, priceTwo);
    };

    handleChangeMinMaxStock = (stockOne: number, stockTwo: number) => {
        this.model.changeMinMaxStock(stockOne, stockTwo);
    };
}
