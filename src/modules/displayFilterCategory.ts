import filterArray from './filterArray';
import createElement from './createElement';

export default function displayFilterCategory() {
    const filterCategoryWrapper = createElement('div', 'filterCategory__wrapper');
    filterCategoryWrapper.classList.add('filter__wrapper');
    const filterCategoryHeader = createElement('div', 'filterCategory__header');
    filterCategoryHeader.classList.add('filter__header');
    filterCategoryHeader.innerText = 'Category';
    const filterCategoryArray = filterArray('category');
    filterCategoryWrapper.append(filterCategoryHeader);
    const filterCategoryUl = createElement('ul');
    for (let i = 0; i < filterCategoryArray.length; i++) {
        const filterCategoryLi = createElement('li');
        const filterCategoryChBox = document.createElement('input');
        filterCategoryChBox.classList.add('checkBoxStyle');
        filterCategoryChBox.classList.add(`filterCategoryBox__${filterCategoryArray[i]}`);
        filterCategoryChBox.type = 'checkbox';
        filterCategoryChBox.id = `filterCategoryBox__${filterCategoryArray[i]}`;
        const filterCategoryChBoxLabel = document.createElement('label');
        filterCategoryChBoxLabel.classList.add(`filterCategoryBoxLabel__${filterCategoryArray[i]}`);
        filterCategoryChBoxLabel.htmlFor = `filterCategoryBox__${filterCategoryArray[i]}`;
        filterCategoryChBoxLabel.textContent = filterCategoryArray[i] as string;
        filterCategoryLi.append(filterCategoryChBox, filterCategoryChBoxLabel);
        filterCategoryUl.append(filterCategoryLi);
    }
    filterCategoryWrapper.append(filterCategoryUl);
    return filterCategoryWrapper;
}
