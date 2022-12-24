import { ViewMainPage } from './components/MainPageView';
import { ViewDetailPage } from './components/DetailPageView';
import { ControllerMainPage } from './components/MainPageConstroller';
import { ControllerDetailPage } from './components/DetailPageConstroller';

export class App {
    view: ViewMainPage | ViewDetailPage | undefined;
    controller: ControllerMainPage | ControllerDetailPage | undefined;

    init() {
        window.addEventListener('myEvent', this.navigate);
        this.navigate();
    }

    navigate = () => {
        const path = window.location.pathname;
        console.log(path);
        switch (path) {
            case '/details':
                this.view = new ViewDetailPage();
                this.controller = new ControllerDetailPage(this.view);
                console.log(2);
                break;
            default:
                this.view = new ViewMainPage();
                this.controller = new ControllerMainPage(this.view);
                console.log(3);
                break;
        }
    };
}
