import '../styles/styleBase.scss';
import getElement from '../utils/getElement';
import createElement from '../utils/createElement';
import getTotallyPrice from '../utils/getTotallyPrice';
import getTotallyCartCount from '../utils/getTotallyCartCount';
export class View {
    app!: HTMLElement;
    header!: HTMLElement;
    main!: HTMLElement;
    footer!: HTMLElement;
    headerWrapper!: HTMLElement;
    headerLogo!: HTMLElement;
    headerLogoLink!: HTMLAnchorElement;
    headerTotalCost!: HTMLElement;
    mainWrapper!: HTMLElement;
    headerCart!: HTMLElement;
    headerCartLink!: HTMLAnchorElement;
    footerWrapper!: HTMLElement;
    baseWrapper!: HTMLElement;
    wrapperBlind!: HTMLElement;
    footerGithub!: HTMLElement;
    footerGithubOne!: HTMLAnchorElement;
    footerGithubTwo!: HTMLAnchorElement;
    footerYear!: HTMLElement;
    footerSchool!: HTMLAnchorElement;
    headerCartText!: HTMLElement;
    constructor() {
        const totalCost = String(getTotallyPrice());
        const cartCount = String(getTotallyCartCount());
        this.displayBasePage(totalCost, cartCount);
    }
    displayBasePage(totalCost: string, cartCount: string) {
        this.app = getElement('body') as HTMLElement;
        this.app.innerHTML = '';
        this.baseWrapper = createElement('div', 'base__wrapper');
        this.wrapperBlind = createElement('div', 'wrapper__blind');
        this.header = createElement('header', 'header');
        this.headerWrapper = createElement('div', 'header__wrapper');
        this.headerLogo = createElement('div', 'header__logo');
        this.headerLogoLink = this.createLinkElement('#', 'header__logo_link');
        this.headerLogoLink.innerHTML = 'Online-Store';
        this.headerTotalCost = createElement('span', 'header__totalCost');
        this.headerTotalCost.textContent = `Total cost: ${totalCost} $`;
        this.headerCart = createElement('div', 'header__cart');
        this.headerCartText = createElement('span', 'header__cart_text');
        this.headerCart.append(this.headerCartText);
        this.headerCartText.textContent = `${cartCount}`;
        this.headerCart.addEventListener('click', () => (window.location.hash = 'cart/'));
        this.headerCartLink = this.createLinkElement('#cart', 'header__cart_link');
        this.app.addEventListener(
            'click',
            () => (this.headerTotalCost.textContent = `Total cost: ${getTotallyPrice()} $`)
        );
        this.app.addEventListener('click', () => (this.headerCartText.innerText = `${getTotallyCartCount()}`));
        this.main = createElement('main');
        this.mainWrapper = createElement('div', 'main__wrapper');
        this.footer = createElement('footer');
        this.footerWrapper = createElement('div', 'footer__wrapper');
        this.footerGithub = createElement('div', 'footer__github');
        this.footerGithubOne = createElement('a', 'footer__githubOne') as HTMLAnchorElement;
        this.footerGithubOne.href = 'https://github.com/AP-Est';
        this.footerGithubTwo = createElement('a', 'footer__githubTwo') as HTMLAnchorElement;
        this.footerGithubTwo.href = 'https://github.com/natalliasnv';
        this.footerYear = createElement('a', 'footer__year');
        this.footerYear.innerHTML = '2023';
        this.footerSchool = createElement('a', 'footer__school') as HTMLAnchorElement;
        this.footerSchool.href = 'https://rs.school/js/';

        this.headerLogo.append(this.headerLogoLink);
        this.headerCart.append(this.headerCartLink);
        this.headerWrapper.append(this.headerLogo, this.headerTotalCost, this.headerCart);
        this.header.append(this.headerWrapper);
        this.main.append(this.mainWrapper);
        this.footerGithub.append(this.footerGithubOne, this.footerGithubTwo);
        this.footerWrapper.append(this.footerGithub, this.footerYear, this.footerSchool);
        this.footer.append(this.footerWrapper);
        this.baseWrapper.append(this.wrapperBlind, this.header, this.main, this.footer);
        if (this.app !== undefined) {
            this.app.append(this.baseWrapper);
        }
    }
    createLinkElement(link: string, className?: string) {
        const element = document.createElement('a');
        element.href = link;
        element.classList.add('link');
        if (className) element.classList.add(className);
        return element;
    }
    bindUpdateData(handler: () => void) {
        this.app.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;
            if (target.classList.contains('wrapper__blind')) {
                handler();
            }
        });
    }
}
