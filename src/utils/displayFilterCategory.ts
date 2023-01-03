//import filterArray from './filterArray';
import createElement from './createElement';
import { IFilterData, IProduct } from '../data/data';

export default function displayFilterCategory(products: IProduct[], filter: IFilterData) {
    //console.log('displayFilterCategory filter:', filter);
    const filterCategoryWrapper = createElement('div', 'filterCategory__wrapper');
    filterCategoryWrapper.classList.add('filter__wrapper');
    const filterCategoryHeader = createElement('div', 'filterCategory__header');
    filterCategoryHeader.classList.add('filter__header');
    filterCategoryHeader.innerText = 'Category';
    //const filterCategoryArray = filterArray('category');
    const filterCategoryArray = Array.from(new Set(products.map((item) => item.category)));
    filterCategoryWrapper.append(filterCategoryHeader);
    const filterCategoryUl = createElement('ul');
    //console.log('displayFilterCategory filterCategoryArray.length', filterCategoryArray.length);
    for (let i = 0; i < filterCategoryArray.length; i++) {
        const title = filterCategoryArray[i] as string;
        const filterCategoryLi = createElement('li');
        const filterCategoryChBox = document.createElement('input');
        filterCategoryChBox.classList.add('checkBoxStyleCategory');
        filterCategoryChBox.classList.add('filterCategoryBox');
        filterCategoryChBox.classList.add(`filterCategoryBox__${filterCategoryArray[i]}`);
        filterCategoryChBox.type = 'checkbox';
        filterCategoryChBox.id = `filterCategoryBox__${filterCategoryArray[i]}`;
        const filterCategoryChBoxLabel = document.createElement('label');
        filterCategoryChBoxLabel.classList.add(`filterCategoryBoxLabel`);
        filterCategoryChBoxLabel.classList.add(`filterCategoryBoxLabel__${filterCategoryArray[i]}`);
        filterCategoryChBoxLabel.htmlFor = `filterCategoryBox__${filterCategoryArray[i]}`;
        filterCategoryChBoxLabel.textContent = title;
        if (filter.categories.includes(title)) {
            //filterCategoryChBox.classList.add('checkedB');
            filterCategoryChBox.checked = true;
            filterCategoryChBoxLabel.classList.add('checked');
        }
        filterCategoryLi.append(filterCategoryChBox, filterCategoryChBoxLabel);
        filterCategoryUl.append(filterCategoryLi);
    }
    filterCategoryWrapper.append(filterCategoryUl);
    return filterCategoryWrapper;
}
