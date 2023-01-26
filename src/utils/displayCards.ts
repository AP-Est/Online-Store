import createElement from './createElement';
import createButton from './createButton';
import checkLocalStorage from './checkLocalstorage';
import { IFilterData, IProduct } from '../types/types';

export default function displayCards(products: IProduct[], filter: IFilterData, productsFiltered: IProduct[]) {
    const goods = createElement('div', 'goods');
    const top = createElement('div', 'top');

    const sort = createElement('div', 'sort');
    const sortSelect = createElement('select', 'sort__select') as HTMLSelectElement;
    sortSelect.name = 'sortProducts';
    const sortOptionTitle = createElement('option', 'sort__option') as HTMLOptionElement;
    sortOptionTitle.value = '';
    if (filter.sort === '') {
        sortOptionTitle.textContent = 'Sort options:';
    } else {
        sortOptionTitle.textContent = filter.sort;
    }
    const sortOptionPriceASC = createElement('option', 'sort__option') as HTMLOptionElement;
    sortOptionPriceASC.value = 'PriceASC';
    sortOptionPriceASC.textContent = 'Sort by price ASC';
    const sortOptionPriceDESC = createElement('option', 'sort__option') as HTMLOptionElement;
    sortOptionPriceDESC.value = 'PriceDESC';
    sortOptionPriceDESC.textContent = 'Sort by price DESC';
    const sortOptionRatingASC = createElement('option', 'sort__option') as HTMLOptionElement;
    sortOptionRatingASC.value = 'RatingASC';
    sortOptionRatingASC.textContent = 'Sort by rating ASC';
    const sortOptionRatingDESC = createElement('option', 'sort__option') as HTMLOptionElement;
    sortOptionRatingDESC.value = 'RatingDESC';
    sortOptionRatingDESC.textContent = 'Sort by rating DESC';
    const sortOptionDiscountASC = createElement('option', 'sort__option') as HTMLOptionElement;
    sortOptionDiscountASC.value = 'DiscountASC';
    sortOptionDiscountASC.textContent = 'Sort by discount ASC';
    const sortOptionDiscountDESC = createElement('option', 'sort__option') as HTMLOptionElement;
    sortOptionDiscountDESC.value = 'DiscountDESC';
    sortOptionDiscountDESC.textContent = 'Sort by discount DESC';

    const found = createElement('p', 'found');
    found.textContent = `Found:${productsFiltered.length}`;

    const search = createElement('div', 'search');
    const searchInput = createElement('input', 'search__input') as HTMLInputElement;
    searchInput.type = 'text';
    searchInput.placeholder = 'Search product';
    searchInput.value = filter.search;

    const view = createElement('div', 'view');
    const viewSmall = createElement('div', 'view__small');
    viewSmall.classList.add('view__common');
    for (let i = 0; i < 16; i++) {
        const viewSmallElement = createElement('div', 'view__smallElement');
        viewSmall.append(viewSmallElement);
    }
    const viewLarge = createElement('div', 'view__large');
    viewLarge.classList.add('view__common');
    for (let i = 0; i < 36; i++) {
        const viewLargeElement = createElement('div', 'view__largeElement');
        viewLarge.append(viewLargeElement);
    }

    const cards = createElement('div', 'cards');
    if (productsFiltered.length === 0) {
        const cardsTextNoProducts = createElement('div', 'cards__noproducts');
        cardsTextNoProducts.textContent = 'No products found';
        cards.append(cardsTextNoProducts);
        cards.classList.add('displayBlock');
    }

    const cardsDiv = [];
    const cardsButtonCart: HTMLElement[] = [];
    const cardsButtonDetails: HTMLElement[] = [];
    const cardsDivName = [];
    for (let i = 0; i < productsFiltered.length; i++) {
        cardsDiv[i] = createElement('div', 'cardsDiv');
        cardsDiv[i].style.background = `url(${productsFiltered[i].thumbnail})`;
        cardsDiv[i].style.backgroundSize = 'cover';
        cardsDiv[i].style.backgroundRepeat = 'round';
        cardsDiv[i].id = `${i}`;
        cardsDivName[i] = createElement('div', 'cardDiv__Name');
        cardsDivName[i].textContent = productsFiltered[i].title;
        if (filter.view === 'small') {
            cardsDivName[i].classList.remove('fontSizeSmall');
        }
        if (filter.view === 'large') {
            cardsDivName[i].classList.add('fontSizeSmall');
        }

        let idOfProduct = 0;
        products.map((item) => {
            if (productsFiltered[i].title === item.title) {
                idOfProduct = item.id - 1;
            }
        });

        if (checkLocalStorage(idOfProduct + 1)) {
            cardsButtonCart[i] = createButton('DROP FROM CART', 'cardDiv__cart');
        } else {
            cardsButtonCart[i] = createButton('ADD TO CART', 'cardDiv__cart');
        }
        cardsButtonCart[i].id = `${idOfProduct}`;

        if (filter.view === 'small') {
            cardsButtonCart[i].classList.remove('fontSizeSmall');
        }
        if (filter.view === 'large') {
            cardsButtonCart[i].classList.add('fontSizeSmall');
        }
        cardsButtonDetails[i] = createButton('DETAILS', 'cardDiv__details');
        cardsButtonDetails[i].id = `${idOfProduct}`;

        if (filter.view === 'small') {
            cardsButtonDetails[i].classList.remove('fontSizeSmall');
        }
        if (filter.view === 'large') {
            cardsButtonDetails[i].classList.add('fontSizeSmall');
        }
        cardsDiv[i].append(cardsDivName[i], cardsButtonCart[i], cardsButtonDetails[i]);
        cards.append(cardsDiv[i]);
    }

    if (filter.view === 'small') {
        cards.classList.add('cards__small');
        viewSmall.classList.add('view__dedicated');
        viewLarge.classList.remove('view__dedicated');
    }
    if (filter.view === 'large') {
        cards.classList.add('cards__large');
        viewLarge.classList.add('view__dedicated');
        viewSmall.classList.remove('view__dedicated');
    }

    view.append(viewSmall, viewLarge);
    search.append(searchInput);
    sortSelect.append(
        sortOptionTitle,
        sortOptionPriceASC,
        sortOptionPriceDESC,
        sortOptionRatingASC,
        sortOptionRatingDESC,
        sortOptionDiscountASC,
        sortOptionDiscountDESC
    );
    sort.append(sortSelect);
    top.append(sort, found, search, view);
    goods.append(top, cards);

    return goods;
}
