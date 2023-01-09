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
        const path = window.location.hash.split('/');
        console.log(path);
        //console.log(path[0]);
        switch (path[0]) {
            case '#details':
                if (Number(path[1]) && 0 < Number(path[1]) && Number(path[1]) < 101) {
                    this.view = new DetailPageView();
                    this.model = new DetailPageModel();
                    this.controller = new DetailPageController(this.view, this.model);
                } else {
                    this.view = new Page404View();
                }
                break;
            case '#cart':
                if (!path[1]) {
                    this.view = new CartPageView();
                    this.model = new CartPageModel();
                    this.controller = new ControllerCartPage(this.view, this.model);
                } else {
                    this.view = new Page404View();
                }
                break;
            case '':
                this.view = new MainPageView();
                this.model = new MainPageModel();
                this.controller = new ControllerMainPage(this.view, this.model);
                break;
            default:
                this.view = new Page404View();
                break;
        }
    };
}
