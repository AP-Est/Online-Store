import { MainPageView } from './components/MainPageView';
import { MainPageModel } from './components/MainPageModel';
import { DetailPageView } from './components/DetailPageView';
import { ControllerMainPage } from './components/MainPageController';
import { ControllerDetailPage } from './components/DetailPageController';

export class App {
    view: MainPageView | DetailPageView | undefined;
    controller: ControllerMainPage | ControllerDetailPage | undefined;
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
                console.log('Detail');
                this.view = new DetailPageView();
                this.controller = new ControllerDetailPage(this.view);
                console.log('Detail');
                break;
            default:
                //console.log('Main');
                this.view = new MainPageView();
                this.model = new MainPageModel();
                this.controller = new ControllerMainPage(this.view, this.model);
                //console.log('Main');
                break;
        }
    };
}
