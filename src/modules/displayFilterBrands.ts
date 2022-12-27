import createElement from './createElement';
import filterArray from './filterArray';

export default function displayFilterBrands() {
    const filterBrandsWrapper = createElement('div', 'filterBrands__wrapper');
    filterBrandsWrapper.classList.add('filter__wrapper');
    const filterBrandsHeader = createElement('div', 'filterBrands__header');
    filterBrandsHeader.classList.add('filter__header');
    filterBrandsHeader.innerText = 'Brand';
    const filterBrandsArray = filterArray('brand');
    filterBrandsWrapper.append(filterBrandsHeader);
    const filterBrandUl = createElement('ul');
    for (let i = 0; i < filterBrandsArray.length; i++) {
        const filterBrandLi = createElement('li');
        const unreadyTitles = filterBrandsArray[i] as string;
        const brandTitle = unreadyTitles.split(' ').join('');
        const filterBrandsChBox = document.createElement('input');
        filterBrandsChBox.classList.add(`filterBrandsBox__${brandTitle}`);
        filterBrandsChBox.type = 'checkbox';
        filterBrandsChBox.id = `filterBrandsBox__${brandTitle}`;
        const filterBrandChBoxLabel = document.createElement('label');
        filterBrandChBoxLabel.classList.add(`filterBrandsBoxLabel__${brandTitle}`);
        filterBrandChBoxLabel.htmlFor = `filterBrandsBox__${brandTitle}`;
        filterBrandChBoxLabel.textContent = filterBrandsArray[i] as string;
        filterBrandLi.append(filterBrandsChBox, filterBrandChBoxLabel);
        filterBrandUl.append(filterBrandLi);
    }
    filterBrandsWrapper.append(filterBrandUl);
    return filterBrandsWrapper;
}
