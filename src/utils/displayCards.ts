import createElement from './createElement';
import { IProduct } from '../data/data';

export default function displayCards(productsFiltered: IProduct[]) {
    const goods = createElement('div', 'goods');
    const top = createElement('div', 'top');

    const cards = createElement('div', 'cards');
    const cardDiv = [];
    for (let i = 0; i < productsFiltered.length; i++) {
        cardDiv[i] = createElement('div', 'cardDiv');
        cardDiv[i].style.background = `url(${productsFiltered[i].thumbnail})`;
        cardDiv[i].style.backgroundSize = 'cover';
        cardDiv[i].id = `${i}`;
        cards.append(cardDiv[i]);
    }

    goods.append(top, cards);

    return goods;
}
