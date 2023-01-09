import { MainPageView } from './components/MainPageView';
import { MainPageModel } from './components/MainPageModel';
import { DetailPageView } from './components/DetailPageView';
import { ControllerMainPage } from './components/MainPageController';
import { DetailPageController } from './components/DetailPageController';
import { CartPageView } from './components/CartPageView';
import { CartPageModel } from './components/CartPageModel';
import { ControllerCartPage } from './components/CartPageController';
import { DetailPageModel } from './components/DetailPageModel';
export class App {
    view: MainPageView | DetailPageView | CartPageView | undefined;
    controller: ControllerMainPage | DetailPageController | ControllerCartPage | undefined;
    model: MainPageModel | CartPageModel | DetailPageModel | undefined;

    init() {
        window.addEventListener('hashchange', this.navigate);
        this.navigate();
    }

    navigate = () => {
        const path = window.location.hash.slice(1).split('/');
        //console.log(path[0]);
        switch (path[0]) {
            case 'details':
                this.view = new DetailPageView();
                this.model = new DetailPageModel();
                this.controller = new DetailPageController(this.view, this.model);
                break;
            case 'cart':
                this.view = new CartPageView();
                this.model = new CartPageModel();
                this.controller = new ControllerCartPage(this.view, this.model);
                break;
            default:
                this.view = new MainPageView();
                this.model = new MainPageModel();
                this.controller = new ControllerMainPage(this.view, this.model);
                break;
        }
    };
}
