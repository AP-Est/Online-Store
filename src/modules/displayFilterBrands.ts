import createElement from './createElement';
import filterArray from './filterArray';

export default function displayFilterBrands() {
    const filterBrandsWrapper = createElement('div', 'filterBrands__wrapper');
    const filterBrandsHeader = createElement('div', 'filterBrands__header');
    filterBrandsHeader.innerText = 'Brand';
    const filterBrandsArray = filterArray('brand');
    filterBrandsWrapper.append(filterBrandsHeader);
    for (let i = 0; i < filterBrandsArray.length; i++) {
        const brandTitle = filterBrandsArray[i] as string;
        const t1 = brandTitle.split(' ').join('');
        const filterBrandsPoint = createElement('span', `filterBrands__${t1}`);
        const filterBrandsChBox = document.createElement('input');
        filterBrandsChBox.classList.add(`filterBrandsBox__${t1}`);
        filterBrandsChBox.type = 'checkbox';
        filterBrandsPoint.textContent = filterBrandsArray[i] as string;
        filterBrandsWrapper.append(filterBrandsChBox, filterBrandsPoint);
    }
    return filterBrandsWrapper;
}
