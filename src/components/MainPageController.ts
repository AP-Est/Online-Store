import { MainPageView } from 'MainPageView';

export class ControllerMainPage {
    view: MainPageView;

    constructor(view: MainPageView) {
        this.view = view;
        this.view.bindAddDetailAddress(this.handleAddDetailAddress);
        // this.productsChanged(this.model.productsChanged);
        // this.categoryChanged(this.model.products, this.model.productsChanged);
        // this.brandChanged(this.model.products, this.model.productsChanged);
        // this.priceChanged(this.model.products, this.model.productsChanged);
        // this.stockChanged(this.model.products, this.model.productsChanged);
        // this.view.bindChooseCategory(this.handleChooseCategory);
        // this.view.bindChooseBrand(this.handleChooseBrand);
        // this.view.bindSetPrice(this.handleSetPrice);
        // this.view.bindSetStock(this.handleSetStock);
    }

    handleAddDetailAddress = (cardNumber: number) => {
        window.location.hash = `details/${cardNumber + 1}`;
    };

    //   productsChanged = (productsChanged) => {
    //       this.view.displayProductCards(productsChanged);
    //   };

    //   categoryChanged = (products, productsChanged) => {
    //     this.view.displayFilterCategory(products, productsChanged);
    //   };

    //   brandChanged = (products, productsChanged) => {
    //       this.view.displayFilterBrand(products, productsChanged);
    //   };

    //   priceChanged = (products, productsChanged) => {
    //       this.view.displayFilterPrice(products, productsChanged);
    //   };

    //   stockChanged = (products, productsChanged) => {
    //     this.view.displayFilterStock(products, productsChanged);
    // };

    //   handleChooseCategory = (category) => {
    //       this.model.filterProducts(category)
    //   };

    //   handleChooseBrand = (brand) => {
    //       this.model.filterProducts('',brand)
    //   };

    //   handleSetPrice = (parameter) => {
    //       this.model.filterProducts('', '', parameter)
    //   };

    //   handleSetStock = (parameter) => {
    //       this.model.filterProducts('', '', NaN, parameter)
    //   };
}
