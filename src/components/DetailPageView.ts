import '../styles/styleDetailPage.scss';
import { storeData } from '../data/data';
import { View } from './BaseView';
import createButton from '../modules/createButton';
import createElement from '../modules/createElement';

export class DetailPageView extends View {
    //app: HTMLElement | undefined;
    wayBlock: HTMLElement;
    productBlock: HTMLElement;
    detail__wrapper: HTMLElement;
    productBlock__title: HTMLElement;
    productBlock__productBlockMainBlock: HTMLElement;
    productBlockMainBlock__pictures: HTMLElement;
    productBlockMainBlock__preview: HTMLElement;
    productBlockMainBlock__info: HTMLElement;
    productBlockMainBlock__price: HTMLElement;
    productBlockMainBlock__price_price: HTMLElement;
    productBlockMainBlock__price_buttonAdd: HTMLButtonElement;
    //productBlockMainBlock__price_buttonDel: HTMLButtonElement;
    productBlockMainBlock__price_buttonBuyNow: HTMLButtonElement;
    pic_array: string[];
    productBlockMainBlock__pictures_pic: HTMLElement | undefined;
    productBlockMainBlock__preview_pic: HTMLElement;
    productBlockMainBlock__info_card: HTMLElement | undefined;
    productBlockMainBlock__info_cardTitle: HTMLElement | undefined;
    productBlockMainBlock__info_cardData: HTMLElement | undefined;

    constructor() {
        super();
        const cardNumber = Number(window.location.hash.slice(1).split('/')[1]); // Номер товара, на который кликнули
        this.detail__wrapper = createElement('div', 'detail__wrapper');
        this.wayBlock = createElement('div', 'wayBlock');
        this.wayBlock.textContent = this.getWay(cardNumber);
        this.productBlock = createElement('div', 'productBlock');
        this.productBlock__title = createElement('span', 'productBlock__title');
        this.productBlock__title.textContent = storeData.products[cardNumber - 1].title;
        this.productBlock__productBlockMainBlock = createElement('div', 'productBlock_productBlockMainBlock');
        this.productBlockMainBlock__pictures = createElement('div', 'productBlockMainBlock__pictures');
        this.pic_array = [...storeData.products[cardNumber - 1].images];
        for (let i = 0; i < this.pic_array.length; i++) {
            this.productBlockMainBlock__pictures_pic = createElement('div', 'productBlockMainBlock__pictures_pic' + i);
            this.productBlockMainBlock__pictures_pic.classList.add('pictures_pic');
            this.productBlockMainBlock__pictures_pic.style.backgroundImage = `url(${this.pic_array[i]})`;
            this.productBlockMainBlock__pictures_pic.addEventListener(
                'click',
                () => (this.productBlockMainBlock__preview_pic.style.backgroundImage = `url(${this.pic_array[i]})`)
            );
            this.productBlockMainBlock__pictures.append(this.productBlockMainBlock__pictures_pic);
        }
        this.productBlockMainBlock__preview = createElement('div', 'productBlockMainBlock__preview');
        this.productBlockMainBlock__preview_pic = createElement('div', 'productBlockMainBlock__preview_pic');
        this.productBlockMainBlock__preview_pic.style.backgroundImage = `url(${this.pic_array[0]})`;
        this.productBlockMainBlock__info = createElement('div', 'productBlockMainBlock__info');
        this.createInfoFields();
        this.productBlockMainBlock__price = createElement('div', 'productBlockMainBlock__price');
        this.productBlockMainBlock__price_price = createElement('span', 'productBlockMainBlock__price_price');
        this.productBlockMainBlock__price_price.textContent = `$${storeData.products[cardNumber - 1].price}`;

        this.productBlockMainBlock__price_buttonAdd = createButton(
            'add to cart',
            'productBlockMainBlock__price_buttonAdd'
        );
        //this.productBlockMainBlock__price_buttonDel = this.createButton('drop from cart', 'productBlockMainBlock__price_buttonDel');
        this.productBlockMainBlock__price_buttonBuyNow = createButton(
            'buy now',
            'productBlockMainBlock__price_buttonBuyNow'
        );

        // собираем страницу

        this.productBlockMainBlock__preview.append(this.productBlockMainBlock__preview_pic);

        this.productBlockMainBlock__price.append(
            this.productBlockMainBlock__price_price,
            this.productBlockMainBlock__price_buttonAdd,
            this.productBlockMainBlock__price_buttonBuyNow
        );
        this.productBlock__productBlockMainBlock.append(
            this.productBlockMainBlock__pictures,
            this.productBlockMainBlock__preview,
            this.productBlockMainBlock__info,
            this.productBlockMainBlock__price
        );
        this.productBlock.append(this.productBlock__title, this.productBlock__productBlockMainBlock);
        this.detail__wrapper.append(this.wayBlock, this.productBlock);
        this.main__wrapper.append(this.detail__wrapper);
    }

    getWay(id = 1) {
        return `STORE >> ${storeData.products[id - 1].category} >> ${storeData.products[id - 1].brand} >> ${
            storeData.products[id - 1].title
        }`;
    }
    createInfoFields(id = 1) {
        const titles = ['Description', 'Discount percentage', 'Rating', 'Stock', 'Brand', 'Category'];
        const keys = [
            storeData.products[id - 1].description,
            storeData.products[id - 1].discountPercentage,
            storeData.products[id - 1].rating,
            storeData.products[id - 1].stock,
            storeData.products[id - 1].brand,
            storeData.products[id - 1].category,
        ];
        for (let i = 0; i < titles.length; i++) {
            this.productBlockMainBlock__info_card = createElement('div', 'productBlockMainBlock__info_card');
            this.productBlockMainBlock__info_cardTitle = createElement('h5', 'productBlockMainBlock__info_cardTitle');
            this.productBlockMainBlock__info_cardTitle.textContent = `${titles[i]}:`;
            this.productBlockMainBlock__info_cardData = createElement('span', 'productBlockMainBlock__cardData');
            this.productBlockMainBlock__info_cardData.textContent = keys[i] as string;
            this.productBlockMainBlock__info_card.append(
                this.productBlockMainBlock__info_cardTitle,
                this.productBlockMainBlock__info_cardData
            );
            this.productBlockMainBlock__info.append(this.productBlockMainBlock__info_card);
        }
    }
}
