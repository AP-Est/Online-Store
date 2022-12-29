import { MainPageView } from './components/MainPageView';
import { MainPageModel } from './components/MainPageModel';
import { DetailPageView } from './components/DetailPageView';
import { ControllerMainPage } from './components/MainPageController';
import { ControllerDetailPage } from './components/DetailPageController';
import { ControllerCartPage } from './components/CartPageController';
import { CartPageView } from './components/CartPageView';

export class App {
    view: MainPageView | DetailPageView | CartPageView | undefined;
    controller: ControllerMainPage | ControllerDetailPage | ControllerCartPage | undefined;
    model: MainPageModel | undefined;

    init() {
        window.addEventListener('hashchange', this.navigate);
        this.navigate();
    }

    navigate = () => {
        const path = window.location.hash.slice(1).split('/');
        console.log(path[0]);
        switch (path[0]) {
            case 'details':
                this.view = new DetailPageView();
                this.controller = new ControllerDetailPage(this.view);
                break;
            case 'cart':
                this.view = new CartPageView();
                this.controller = new ControllerCartPage(this.view);
                break;
            default:
                this.view = new MainPageView();
                this.model = new MainPageModel();
                this.controller = new ControllerMainPage(this.view, this.model);
                break;
        }
    };
}
