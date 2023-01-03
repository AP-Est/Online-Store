import createElement from './createElement';
//import filterArray from './filterArray';
import { IFilterData, IProduct } from '../data/data';

export default function displayFilterBrands(products: IProduct[], filter: IFilterData, productsFiltered: IProduct[]) {
    const filterBrandsWrapper = createElement('div', 'filterBrands__wrapper');
    filterBrandsWrapper.classList.add('filter__wrapper');
    const filterBrandsHeader = createElement('div', 'filterBrands__header');
    filterBrandsHeader.classList.add('filter__header');
    filterBrandsHeader.innerText = 'Brand';
    //const filterBrandsArray = filterArray('brand');
    const filterBrandsArray = Array.from(new Set(products.map((item) => item.brand)));
    //console.log('filterBrandsArray', filterBrandsArray);
    filterBrandsWrapper.append(filterBrandsHeader);
    const filterBrandUl = createElement('ul');
    for (let i = 0; i < filterBrandsArray.length; i++) {
        const filterBrandLi = createElement('li');
        const unreadyTitles = filterBrandsArray[i] as string;
        const brandTitle = unreadyTitles.split(' ').join('');
        const filterBrandsChBox = document.createElement('input');
        filterBrandsChBox.classList.add('checkBoxStyleBrand');
        filterBrandsChBox.classList.add(`filterBrandsBox__${brandTitle}`);
        filterBrandsChBox.type = 'checkbox';
        filterBrandsChBox.id = `filterBrandsBox__${brandTitle}`;
        const filterBrandChBoxLabel = document.createElement('label');
        filterBrandChBoxLabel.classList.add(`filterBrandsBoxLabel__${brandTitle}`);
        filterBrandChBoxLabel.htmlFor = `filterBrandsBox__${brandTitle}`;
        filterBrandChBoxLabel.textContent = filterBrandsArray[i] as string;
        if (filter.brands.includes(unreadyTitles)) {
            //filterBrandsChBox.classList.add('checkedB');
            filterBrandsChBox.checked = true;
            filterBrandChBoxLabel.classList.add('checked');
        }
        //console.log('productsFiltered', productsFiltered);
        // productsFiltered.map((item) => {
        //     if (item.brand.split(' ').join('') !== unreadyTitles) {
        //         filterBrandChBoxLabel.classList.add('noneVisible');
        //     }
        // });
        filterBrandLi.append(filterBrandsChBox, filterBrandChBoxLabel);
        filterBrandUl.append(filterBrandLi);
    }
    filterBrandsWrapper.append(filterBrandUl);
    return filterBrandsWrapper;
}
