import { MainPageView } from 'MainPageView';

export class ControllerMainPage {
    view: MainPageView;

    constructor(view: MainPageView) {
        this.view = view;
        this.view.bindAddDetailAddress(this.handleAddDetailAddress);
    }

    handleAddDetailAddress = (cardNumber: number) => {
        window.location.hash = `details/${cardNumber + 1}`;
    };
}
