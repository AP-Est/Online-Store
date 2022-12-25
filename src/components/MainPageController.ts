import { ViewMainPage } from 'MainPageView';

export class ControllerMainPage {
    view: ViewMainPage;

    constructor(view: ViewMainPage) {
        this.view = view;
        this.view.bindAddDetailAddress(this.handleAddDetailAddress);
    }

    handleAddDetailAddress = (cardNumber: number) => {
        window.location.hash = `details/${cardNumber}`;
    };
}
