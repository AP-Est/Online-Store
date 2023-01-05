import createElement from './createElement';
import { IProduct, IFilterData } from '../data/data';

export default function displayCards(productsFiltered: IProduct[], filter: IFilterData) {
    const goods = createElement('div', 'goods');
    const top = createElement('div', 'top');

    const sort = createElement('div', 'sort');
    const sortSelect = createElement('select', 'sort__select') as HTMLSelectElement;
    sortSelect.name = 'sortProducts';
    const sortOptionTitle = createElement('option', 'sort__option') as HTMLOptionElement;
    sortOptionTitle.value = '';
    sortOptionTitle.textContent = 'Sort options:';
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
    const cardDiv = [];
    for (let i = 0; i < productsFiltered.length; i++) {
        cardDiv[i] = createElement('div', 'cardDiv');
        cardDiv[i].style.background = `url(${productsFiltered[i].thumbnail})`;
        cardDiv[i].style.backgroundSize = 'cover';
        cardDiv[i].id = `${i}`;
        cards.append(cardDiv[i]);
    }

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
