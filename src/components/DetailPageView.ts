import '../styles/styleDetailPage.scss';
import { storeData } from '../data/data';
import { View } from './BaseView';
import createButton from '../modules/createButton';
import createElement from '../modules/createElement';
import pushToLocalStorage from '../utils/pushToLocalStorage';

export class DetailPageView extends View {
    //app: HTMLElement | undefined;
    wayBlock: HTMLElement;
    productBlock: HTMLElement;
    detailWrapper: HTMLElement;
    productBlockTitle: HTMLElement;
    productMainBlock: HTMLElement;
    productBlockPictures: HTMLElement;
    productBlockPreview: HTMLElement;
    productBlockInfo: HTMLElement;
    productBlockPrice: HTMLElement;
    productBlockPriceText: HTMLElement;
    productBlockPriceButtonAdd: HTMLButtonElement;
    //productBlockPriceButtonDel: HTMLButtonElement;
    productBlockPriceButtonBuyNow: HTMLButtonElement;
    picArray: string[];
    productBlockPicturesExemplar: HTMLElement | undefined;
    productBlockPreviewPic: HTMLElement;
    productBlockInfoCard: HTMLElement | undefined;
    productBlockMainBlockInfoCardTitle: HTMLElement | undefined;
    productBlockInfoCardData: HTMLElement | undefined;
    productBlockPicturesExemplarPic: HTMLImageElement | undefined;
    productBlockPriceButtonDel: any;

    constructor() {
        super();
        const cardNumber = Number(window.location.hash.slice(1).split('/')[1]); // Номер товара, на который кликнули
        this.detailWrapper = createElement('div', 'detail__wrapper');
        this.wayBlock = createElement('div', 'wayBlock');
        this.wayBlock.textContent = this.getWay(cardNumber);
        this.productBlock = createElement('div', 'productBlock');
        this.productBlockTitle = createElement('span', 'productBlock__title');
        this.productBlockTitle.textContent = storeData.products[cardNumber - 1].title;
        this.productMainBlock = createElement('div', 'productBlock_productBlockMainBlock');
        this.productBlockPictures = createElement('div', 'productBlockMainBlock__pictures');
        this.picArray = [...storeData.products[cardNumber - 1].images];
        for (let i = 0; i < this.picArray.length; i++) {
            this.productBlockPicturesExemplar = createElement('container', 'productBlockMainBlock__pictures_pic' + i);
            this.productBlockPicturesExemplarPic = createElement(
                'img',
                'productBlockMainBlock__pictures_pic' + i
            ) as HTMLImageElement;
            this.productBlockPicturesExemplarPic.src = `${this.picArray[i]}`;
            this.productBlockPicturesExemplar.append(this.productBlockPicturesExemplarPic);
            this.productBlockPicturesExemplar.classList.add('pictures_pic');
            this.productBlockPicturesExemplar.addEventListener(
                'click',
                () => (this.productBlockPreviewPic.style.backgroundImage = `url(${this.picArray[i]})`)
            );
            this.productBlockPictures.append(this.productBlockPicturesExemplar);
        }
        this.productBlockPreview = createElement('div', 'productBlockMainBlock__preview');
        this.productBlockPreviewPic = createElement('div', 'productBlockMainBlock__preview_pic');
        this.productBlockPreviewPic.style.backgroundImage = `url(${this.picArray[0]})`;
        this.productBlockInfo = createElement('div', 'productBlockMainBlock__info');
        this.createInfoFields();
        this.productBlockPrice = createElement('div', 'productBlockMainBlock__price');
        this.productBlockPriceText = createElement('span', 'productBlockMainBlock__price_price');
        this.productBlockPriceText.textContent = `$${storeData.products[cardNumber - 1].price}`;

        this.productBlockPriceButtonAdd = createButton('Add to cart', 'productBlockMainBlock__price_buttonAdd');
        this.productBlockPriceButtonDel = createButton('Drop from cart', 'productBlockMainBlock__price_buttonDel');
        this.productBlockPriceButtonAdd.addEventListener('click', () => {
            pushToLocalStorage(cardNumber);
            this.productBlockPriceButtonDel.style.display = 'block';
            this.productBlockPriceButtonAdd.style.display = 'none';
        });
        this.productBlockPriceButtonDel.style.display = 'none';
        this.productBlockPriceButtonBuyNow = createButton('Buy now', 'productBlockMainBlock__price_buttonBuyNow');

        // собираем страницу

        this.productBlockPreview.append(this.productBlockPreviewPic);

        this.productBlockPrice.append(
            this.productBlockPriceText,
            this.productBlockPriceButtonAdd,
            this.productBlockPriceButtonDel,
            this.productBlockPriceButtonBuyNow
        );
        this.productMainBlock.append(
            this.productBlockPictures,
            this.productBlockPreview,
            this.productBlockInfo,
            this.productBlockPrice
        );
        this.productBlock.append(this.productBlockTitle, this.productMainBlock);
        this.detailWrapper.append(this.wayBlock, this.productBlock);
        this.mainWrapper.append(this.detailWrapper);
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
            this.productBlockInfoCard = createElement('div', 'productBlockMainBlock__info_card');
            this.productBlockMainBlockInfoCardTitle = createElement('h5', 'productBlockMainBlock__info_cardTitle');
            this.productBlockMainBlockInfoCardTitle.textContent = `${titles[i]}:`;
            this.productBlockInfoCardData = createElement('span', 'productBlockMainBlock__cardData');
            this.productBlockInfoCardData.textContent = keys[i] as string;
            this.productBlockInfoCard.append(this.productBlockMainBlockInfoCardTitle, this.productBlockInfoCardData);
            this.productBlockInfo.append(this.productBlockInfoCard);
        }
    }
}
