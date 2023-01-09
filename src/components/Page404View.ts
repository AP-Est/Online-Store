import '../styles/stylePage404.scss';
import createElement from '../utils/createElement';
import { View } from './BaseView';

export class Page404View extends View {
    constructor() {
        super();
        this.renderPage();
    }

    renderPage() {
        const baseWrapper = createElement('div', 'page404__wrapper');
        baseWrapper.textContent = 'PAGE NOT FOUND(404)';
        this.mainWrapper.append(baseWrapper);
    }
}
