import { ViewMainPage } from './components/MainPageView';

export class App extends ViewMainPage {
    view: ViewMainPage;

    constructor() {
        super();
        this.view = new ViewMainPage();
    }

    init() {
        window.addEventListener('popstate', this.navigate);
        this.navigate();
    }

    navigate = () => {
        this.view = new ViewMainPage();
    };
}
