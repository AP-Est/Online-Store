import './style.scss';

class View {
    app: HTMLElement | undefined;
    header: HTMLElement;
    main: HTMLElement;
    footer: HTMLElement;
    header__wrapper: HTMLElement;
    header__logo: HTMLElement;
    header__logo_link: HTMLElement;
    header__totalCost: HTMLElement;
    main__wrapper: HTMLElement;
    header__cart: HTMLElement;
    header__cart_link: HTMLElement;
    footer__wrapper: HTMLElement;
    
    constructor() {
        this.app = this.getElement('body');
        this.header = this.createElement('header', 'header');
        this.header__wrapper = this.createElement('div', 'header__wrapper');
        this.header__logo = this.createElement('div', 'header__logo');
        this.header__logo_link = this.createElement('a', 'header__logo_link');
        this.header__logo_link.innerHTML = '#';
        this.header__totalCost = this.createElement('span', 'header__totalCost');
        this.header__totalCost.textContent = 'Total cost';
        this.header__cart = this.createElement('div', 'header__cart');
        this.header__cart_link = this.createElement('a', 'header__cart_link');
        this.header__cart_link.innerHTML = '#';     

        this.main = this.createElement('main');
        this.main__wrapper = this.createElement('div', 'main__wrapper');

        this.footer = this.createElement('footer');
        this.footer__wrapper = this.createElement('div', 'footer__wrapper');

        // собираем страницу

        this.header__logo.append(this.header__logo_link)
        this.header__cart.append(this.header__cart_link)
        this.header__wrapper.append(this.header__totalCost, this.header__logo, this.header__cart)
        this.header.append(this.header__wrapper)
        this.main.append(this.main__wrapper)
        this.footer.append(this.footer__wrapper)

        if (this.app !== undefined) {
            this.app.append(this.header, this.main, this.footer);
          }
    }


    getElement(selector: string) {
        if (selector !== undefined && selector !== null) {
        const element = document.querySelector(selector) as HTMLElement;
        return element
      }
    }

    createElement(tag: string, className?: string) {
        const element = document.createElement(tag) 
        if (className) element.classList.add(className) 
           
        return element
      }
}
class Model {
    constructor() {}
  }

  class Controller {
    model: any;
    view: any;
    constructor(model: any, view: any) {
      this.model = model
      this.view = view
    }
  }
  const app = new Controller(new Model(), new View())
