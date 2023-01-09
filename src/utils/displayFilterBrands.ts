import createElement from './createElement';
import { IFilterData, IProduct } from '../data/data';

export default function displayFilterBrands(products: IProduct[], filter: IFilterData, productsFiltered: IProduct[]) {
    const filterBrandsWrapper = createElement('div', 'filterBrands__wrapper');
    filterBrandsWrapper.classList.add('filter__wrapper');
    const filterBrandsHeader = createElement('div', 'filterBrands__header');
    filterBrandsHeader.classList.add('filter__header');
    filterBrandsHeader.innerText = 'Brand';
    const filterBrandsArray = Array.from(new Set(products.map((item) => item.brand)));
    filterBrandsWrapper.append(filterBrandsHeader);
    const filterBrandUl = createElement('ul');
    for (let i = 0; i < filterBrandsArray.length; i++) {
        const filterBrandLi = createElement('li');
        filterBrandLi.classList.add('filterLi');
        const unreadyTitles = filterBrandsArray[i] as string;
        const brandTitle = unreadyTitles.split(' ').join('');
        const filterBrandsChBox = document.createElement('input');
        filterBrandsChBox.classList.add('checkBoxStyleBrand');
        filterBrandsChBox.type = 'checkbox';
        filterBrandsChBox.id = `filterBrandsBox__${brandTitle}`;
        const filterBrandChBoxLabel = document.createElement('div');
        filterBrandChBoxLabel.classList.add('chBoxLabel');
        const filterBrandChBoxLabelName = document.createElement('label');
        const filterBrandChBoxLabelCount = document.createElement('label');
        const numberAllProducts = products.filter((item) => item.brand === unreadyTitles).length;
        const numberFilteredProducts = productsFiltered.filter((item) => item.brand === unreadyTitles).length;
        filterBrandChBoxLabelCount.textContent = `  (${numberFilteredProducts}/${numberAllProducts})`;
        filterBrandChBoxLabel.classList.add('opacity');
        filterBrandChBoxLabelName.htmlFor = `filterBrandsBox__${brandTitle}`;
        filterBrandChBoxLabelName.textContent = filterBrandsArray[i] as string;
        productsFiltered.map((item) => {
            if (item.brand === unreadyTitles) {
                filterBrandChBoxLabel.classList.remove('opacity');
            }
        });
        if (filter.brands.includes(unreadyTitles)) {
            filterBrandsChBox.checked = true;
            filterBrandChBoxLabel.classList.add('checked');
        }
        filterBrandChBoxLabel.append(filterBrandChBoxLabelName, filterBrandChBoxLabelCount);
        filterBrandLi.append(filterBrandsChBox, filterBrandChBoxLabel);
        filterBrandUl.append(filterBrandLi);
    }
    filterBrandsWrapper.append(filterBrandUl);
    return filterBrandsWrapper;
}
