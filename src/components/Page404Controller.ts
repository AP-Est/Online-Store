import { Page404View } from 'Page404View';
import { Page404Model } from 'Page404Model';

export class Controller404Page {
    view: Page404View;
    model: Page404Model;

    constructor(view: Page404View, model: Page404Model) {
        this.view = view;
        this.model = model;
    }
}
