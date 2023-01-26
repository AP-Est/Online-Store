import { MainPageView } from './components/MainPageView';
import { MainPageModel } from './components/MainPageModel';
import { DetailPageView } from './components/DetailPageView';
import { ControllerMainPage } from './components/MainPageController';
import { DetailPageController } from './components/DetailPageController';
import { CartPageView } from './components/CartPageView';
import { CartPageModel } from './components/CartPageModel';
import { ControllerCartPage } from './components/CartPageController';
import { DetailPageModel } from './components/DetailPageModel';
import { Page404View } from './components/Page404View';
export class App {
    view: MainPageView | Page404View | DetailPageView | CartPageView | undefined;
    controller: ControllerMainPage | DetailPageController | ControllerCartPage | undefined;
    model: MainPageModel | CartPageModel | DetailPageModel | undefined;

    init() {
        window.addEventListener('hashchange', this.navigate);
        this.navigate();
    }

    navigate = () => {
        const pathHashes = window.location.hash.split('/');
        const isDetailPage = pathHashes[0] === '#details';
        const isCartPage = pathHashes[0] === '#cart';
        const isMainPage = pathHashes[0] === '';
        if (isDetailPage) {
            this.view = new DetailPageView();
            this.model = new DetailPageModel();
            this.controller = new DetailPageController(this.view, this.model);
        } else if (isCartPage) {
            this.view = new CartPageView();
            this.model = new CartPageModel();
            this.controller = new ControllerCartPage(this.view, this.model);
        } else if (isMainPage) {
            this.view = new MainPageView();
            this.model = new MainPageModel();
            this.controller = new ControllerMainPage(this.view, this.model);
        } else {
            this.view = new Page404View();
        }
    };
}
