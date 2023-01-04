//import filterArray from './filterArray';
import createElement from './createElement';
import { IFilterData, IProduct } from '../data/data';

export default function displayFilterCategory(products: IProduct[], filter: IFilterData, productsFiltered: IProduct[]) {
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
        filterCategoryLi.classList.add('filterLi');
        const filterCategoryChBox = document.createElement('input');
        filterCategoryChBox.classList.add('checkBoxStyleCategory');
        filterCategoryChBox.classList.add('filterCategoryBox');
        //filterCategoryChBox.classList.add(`filterCategoryBox__${filterCategoryArray[i]}`);
        filterCategoryChBox.type = 'checkbox';
        //filterCategoryChBox.id = `filterCategoryBox__${filterCategoryArray[i]}`;
        const filterCategoryChBoxLabel = document.createElement('div');
        filterCategoryChBoxLabel.classList.add('chBoxLabel');
        filterCategoryChBoxLabel.classList.add('opacity');
        const filterCategoryChBoxLabelName = document.createElement('label');
        const filterCategoryChBoxLabelCount = document.createElement('label');
        const numberAllProducts = products.filter((item) => item.category === title).length;
        const numberFilteredProducts = productsFiltered.filter((item) => item.category === title).length;
        filterCategoryChBoxLabelCount.textContent = ` (${numberFilteredProducts}/${numberAllProducts})`;
        filterCategoryChBoxLabel.classList.add(`filterCategoryBoxLabel`);
        //filterCategoryChBoxLabel.classList.add(`filterCategoryBoxLabel__${filterCategoryArray[i]}`);
        filterCategoryChBoxLabelName.htmlFor = `filterCategoryBox__${filterCategoryArray[i]}`;
        filterCategoryChBoxLabelName.textContent = title;
        productsFiltered.map((item) => {
            if (item.category === title) {
                filterCategoryChBoxLabel.classList.remove('opacity');
            }
        });
        if (filter.categories.includes(title)) {
            //filterCategoryChBox.classList.add('checkedB');
            filterCategoryChBox.checked = true;
            filterCategoryChBoxLabel.classList.add('checked');
        }
        filterCategoryChBoxLabel.append(filterCategoryChBoxLabelName, filterCategoryChBoxLabelCount);
        filterCategoryLi.append(filterCategoryChBox, filterCategoryChBoxLabel);
        filterCategoryUl.append(filterCategoryLi);
    }
    filterCategoryWrapper.append(filterCategoryUl);
    return filterCategoryWrapper;
}
