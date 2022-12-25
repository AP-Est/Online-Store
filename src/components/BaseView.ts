import '../styles/styleBase.scss';
import getElement from '../modules/getElement';
import createElement from '../modules/createElement';
export class View {
    app: HTMLElement;
    header: HTMLElement;
    main: HTMLElement;
    footer: HTMLElement;
    header__wrapper: HTMLElement;
    header__logo: HTMLElement;
    header__logo_link: HTMLAnchorElement;
    header__totalCost: HTMLElement;
    main__wrapper: HTMLElement;
    header__cart: HTMLElement;
    header__cart_link: HTMLAnchorElement;
    footer__wrapper: HTMLElement;
    constructor() {
        this.app = getElement('body') as HTMLElement;
        this.app.innerHTML = '';
        this.header = createElement('header', 'header');
        this.header__wrapper = createElement('div', 'header__wrapper');
        this.header__logo = createElement('div', 'header__logo');
        this.header__logo_link = this.createLinkElement('//linkToHome', 'header__logo_link');
        this.header__logo_link.innerHTML = 'Online-Store';
        this.header__totalCost = createElement('span', 'header__totalCost');
        this.header__totalCost.textContent = 'Total cost: # $';
        this.header__cart = createElement('div', 'header__cart');
        this.header__cart_link = this.createLinkElement('//link', 'header__cart_link');
        this.header__cart_link.innerHTML = '🛒';
        this.main = createElement('main');
        this.main__wrapper = createElement('div', 'main__wrapper');
        this.footer = createElement('footer');
        this.footer__wrapper = createElement('div', 'footer__wrapper');
        this.footer__wrapper.innerHTML = '2022';

        // собираем страницу

        this.header__logo.append(this.header__logo_link);
        this.header__cart.append(this.header__cart_link);
        this.header__wrapper.append(this.header__logo, this.header__totalCost, this.header__cart);
        this.header.append(this.header__wrapper);
        this.main.append(this.main__wrapper);
        this.footer.append(this.footer__wrapper);

        if (this.app !== undefined) {
            this.app.append(this.header, this.main, this.footer);
        }
    }
    createLinkElement(link: string, className?: string) {
        const element = document.createElement('a');
        element.href = link;
        element.classList.add('link');
        if (className) element.classList.add(className);
        return element;
    }
}
