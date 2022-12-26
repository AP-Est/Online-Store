import { storeData } from '../data/data';
import createElement from '../modules/createElement';

export default function displayFilterCategory() {
    const filterCategoryWrapper = createElement('div', 'filterCategory__wrapper');
    const filterCategoryHeader = createElement('div', 'filterCategory__header');
    filterCategoryHeader.innerText = 'Category';
    const tempArray = [...storeData.products];
    const arr = [];
    for (let i = 0; i < tempArray.length; i++) {
        arr.push(tempArray[i].category);
    }
    const filterCategoryArray = Array.from(new Set(arr));
    filterCategoryWrapper.append(filterCategoryHeader);
    for (let i = 0; i < filterCategoryArray.length; i++) {
        const filterCategoryPoint = createElement('span', `filterCategory__${filterCategoryArray[i]}`);
        const filterCategoryChBox = document.createElement('input');
        filterCategoryChBox.classList.add(`filterCategoryBox__${filterCategoryArray[i]}`);
        filterCategoryChBox.type = 'checkbox';
        filterCategoryPoint.textContent = filterCategoryArray[i];
        filterCategoryWrapper.append(filterCategoryChBox, filterCategoryPoint);
    }
    return filterCategoryWrapper;
}
