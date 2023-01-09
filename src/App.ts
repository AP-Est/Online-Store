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
        console.log('pathHashes', pathHashes);
        let { pathname } = window.location;
        console.log('pathname', pathname);
        pathname = pathname.replace('/Online-Store', '');
        const isDetailPage = pathHashes[0] === '#details' && pathname === '/';
        console.log('isDetailPage', isDetailPage);
        const isCartPage = pathHashes[0] === '#cart' && pathname === '/';
        console.log('isCartPage', isCartPage);
        const isMainPage = pathHashes[0] === '' && pathname === '/';
        console.log('isMainPage', isMainPage);
        console.log('pathname', pathname);
        console.log('pathHashes[0]', pathHashes[0]);
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
