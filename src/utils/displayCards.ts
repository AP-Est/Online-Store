import createElement from './createElement';
import createButton from './createButton';
import { IProduct, IFilterData } from '../data/data';
import checkLocalStorage from './checkLocalstorage';

export default function displayCards(productsFiltered: IProduct[], filter: IFilterData) {
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
    // searchInput.focus();
    // searchInput.select();
    //searchInput.setSelectionRange(1, 1);

    const cards = createElement('div', 'cards');

    if (productsFiltered.length === 0) {
        const cardsTextNoProducts = createElement('div', 'cards__noproducts');
        cardsTextNoProducts.textContent = 'No products found';
        cards.append(cardsTextNoProducts);
        cards.classList.add('displayBlock');
    }

    const cardDiv = [];
    const cardButtonCart = [];
    const cardButtonDetails = [];
    const cardDivName = [];
    for (let i = 0; i < productsFiltered.length; i++) {
        cardDiv[i] = createElement('div', 'cardDiv');
        cardDiv[i].style.background = `url(${productsFiltered[i].thumbnail})`;
        cardDiv[i].style.backgroundSize = 'contain';
        cardDiv[i].style.backgroundRepeat = 'round';
        cardDiv[i].id = `${i}`;
        cardDivName[i] = createElement('div', 'cardDiv__Name');
        cardDivName[i].textContent = productsFiltered[i].title;
        if (checkLocalStorage(i + 1)) {
            cardButtonCart[i] = createButton('DROP FROM CART', 'cardDiv__cart');
            cardButtonCart[i].id = `${i}`;
        } else {
            cardButtonCart[i] = createButton('ADD TO CART', 'cardDiv__cart');
            cardButtonCart[i].id = `${i}`;
        }
        cardButtonDetails[i] = createButton('DETAILS', 'cardDiv__details');
        cardButtonDetails[i].id = `${i}`;
        cardDiv[i].append(cardDivName[i], cardButtonCart[i], cardButtonDetails[i]);
        cards.append(cardDiv[i]);
    }

    console.log('checkLocalStorage(0)', checkLocalStorage(0));

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
    top.append(sort, found, search);
    goods.append(top, cards);

    return goods;
}
