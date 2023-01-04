import { MainPageView } from './components/MainPageView';
import { MainPageModel } from './components/MainPageModel';
import { DetailPageView } from './components/DetailPageView';
import { ControllerMainPage } from './components/MainPageController';
import { ControllerDetailPage } from './components/DetailPageController';
import { CartPageView } from './components/CartPageView';
import { CartPageModel } from './components/CartPageModel';
import { ControllerCartPage } from './components/CartPageController';
export class App {
    view: MainPageView | DetailPageView | CartPageView | undefined;
    controller: ControllerMainPage | ControllerDetailPage | ControllerCartPage | undefined;
    model: MainPageModel | CartPageModel | undefined;

    init() {
        window.addEventListener('hashchange', this.navigate);
        this.navigate();
    }

    navigate = () => {
        const path = window.location.hash.slice(1).split('/');
        console.log(path[0]);
        switch (path[0]) {
            case 'details':
                console.log('Detail');
                this.view = new DetailPageView();
                this.controller = new ControllerDetailPage(this.view);
                break;
            case 'cart':
                this.view = new CartPageView();
                this.model = new CartPageModel();
                this.controller = new ControllerCartPage(this.view, this.model);
                break;
            default:
                //console.log('Main');
                this.view = new MainPageView();
                this.model = new MainPageModel();
                this.controller = new ControllerMainPage(this.view, this.model);
                break;
        }
    };
}
