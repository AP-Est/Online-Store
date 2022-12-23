import { ViewMainPage } from './components/MainPageView';
import { ViewDetailPage } from './components/DetailPageView';

const pag = 'a';
export class App {
    view: ViewMainPage | ViewDetailPage | undefined;
    init() {
        window.addEventListener('popstate', this.navigate);
        this.navigate();
    }

    navigate = () => {
        switch (pag) {
            case 'a':
                this.view = new ViewMainPage();
                break;
            default:
                this.view = new ViewDetailPage();
                break;
        }
    };
}
