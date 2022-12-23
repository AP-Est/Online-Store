import { ViewMainPage } from './components/MainPageView';
import { ViewDetailPage } from './components/DetailPageView';

export class App extends ViewDetailPage {
    view: ViewDetailPage;

    constructor() {
        super();
        this.view = new ViewDetailPage();
    }

    init() {
        // window.addEventListener('popstate', this.navigate);
        // this.navigate();
    }

    navigate = () => {
        this.view = new ViewDetailPage();
    };
}
