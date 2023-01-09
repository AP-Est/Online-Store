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
import { Page404Model } from './components/Page404Model';
import { Controller404Page } from './components/Page404Controller';
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
        const pathNames = window.location.pathname;
        console.log('pathHashes', pathHashes);
        console.log('pathNames', pathNames);
        if (pathHashes[0] === '#details' && pathNames === '/Online-Store/') {
            this.view = new DetailPageView();
            this.model = new DetailPageModel();
            this.controller = new DetailPageController(this.view, this.model);
        } else if (pathHashes[0] === '#cart' && pathNames === '/Online-Store/') {
            this.view = new CartPageView();
            this.model = new CartPageModel();
            this.controller = new ControllerCartPage(this.view, this.model);
        } else if (pathHashes[0] === '' && pathNames === '/Online-Store/') {
            this.view = new MainPageView();
            this.model = new MainPageModel();
            this.controller = new ControllerMainPage(this.view, this.model);
        } else {
            this.view = new Page404View();
        }
    };
}
