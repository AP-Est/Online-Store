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
    //console.log('displayFilterBrands filter:', filter);
    filterBrandsWrapper.append(filterBrandsHeader);
    const filterBrandUl = createElement('ul');
    for (let i = 0; i < filterBrandsArray.length; i++) {
        const filterBrandLi = createElement('li');
        filterBrandLi.classList.add('filterLi');
        const unreadyTitles = filterBrandsArray[i] as string;
        //console.log('displayFilterBrands unreadyTitles:', unreadyTitles);
        const brandTitle = unreadyTitles.split(' ').join('');
        const filterBrandsChBox = document.createElement('input');
        filterBrandsChBox.classList.add('checkBoxStyleBrand');
        //filterBrandsChBox.classList.add(`filterBrandsBox__${brandTitle}`);
        filterBrandsChBox.type = 'checkbox';
        filterBrandsChBox.id = `filterBrandsBox__${brandTitle}`;
        const filterBrandChBoxLabel = document.createElement('div');
        filterBrandChBoxLabel.classList.add('chBoxLabel');
        const filterBrandChBoxLabelName = document.createElement('label');
        //filterBrandChBoxLabelName.classList.add('filterBrandChBoxLabelName');
        const filterBrandChBoxLabelCount = document.createElement('label');
        const numberAllProducts = products.filter((item) => item.brand === unreadyTitles).length;
        const numberFilteredProducts = productsFiltered.filter((item) => item.brand === unreadyTitles).length;
        filterBrandChBoxLabelCount.textContent = `  (${numberFilteredProducts}/${numberAllProducts})`;
        filterBrandChBoxLabel.classList.add('opacity');
        //filterBrandChBoxLabel.classList.add(`filterBrandsBoxLabel__${brandTitle}`);
        filterBrandChBoxLabelName.htmlFor = `filterBrandsBox__${brandTitle}`;
        filterBrandChBoxLabelName.textContent = filterBrandsArray[i] as string;
        //console.log('productsFiltered', productsFiltered);
        productsFiltered.map((item) => {
            if (item.brand === unreadyTitles) {
                filterBrandChBoxLabel.classList.remove('opacity');
            }
        });
        if (filter.brands.includes(unreadyTitles)) {
            //filterBrandsChBox.classList.add('checkedB');
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
