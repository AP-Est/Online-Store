import { ViewMainPage } from 'MainPageView';

export class ControllerMainPage {
    view: ViewMainPage;

    constructor(view: ViewMainPage) {
        this.view = view;
        this.view.bindAddDetailAdress(this.handleAddDetailAdress);
    }

    handleAddDetailAdress = () => {
        history.pushState({}, '', '/details');
    };
}
