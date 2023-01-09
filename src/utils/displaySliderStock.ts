import createElement from './createElement';
import { IFilterData, IProduct } from '../data/data';
import { fillSlider, setToggleAccessible } from './displaySliderPrice';

export default function displaySliderStock(products: IProduct[], filter: IFilterData, productsFiltered: IProduct[]) {
    const filterPriceWrapper = createElement('div', 'filterBrands__wrapper');
    filterPriceWrapper.classList.add('filter__wrapper');
    const filterPriceHeader = createElement('div', 'filterBrands__header');
    filterPriceHeader.classList.add('filter__header');
    filterPriceHeader.innerText = 'Stock';
    filterPriceWrapper.append(filterPriceHeader);

    const rangeContainer = createElement('div', 'range_container');

    const minStockProducts = products.reduce((acc: number, date: IProduct) => {
        return date.stock < acc ? date.stock : acc;
    }, products[0].stock);
    const maxStockProducts = products.reduce((acc: number, date: IProduct) => {
        return date.stock > acc ? date.stock : acc;
    }, products[0].stock);

    let minStockFilteredProducts = 0;
    let maxStockFilteredProducts = 0;
    if (productsFiltered.length !== 0) {
        minStockFilteredProducts = productsFiltered.reduce((acc: number, date: IProduct) => {
            return date.stock < acc ? date.stock : acc;
        }, productsFiltered[0].stock);
        maxStockFilteredProducts = productsFiltered.reduce((acc: number, date: IProduct) => {
            return date.stock > acc ? date.stock : acc;
        }, productsFiltered[0].stock);
    } else {
        minStockFilteredProducts = minStockProducts;
        maxStockFilteredProducts = maxStockProducts;
    }

    const slidersControl = createElement('div', 'sliders_control');
    const fromSlider = createElement('input') as HTMLInputElement;
    fromSlider.id = 'fromSliderStock';
    fromSlider.type = 'range';
    fromSlider.min = String(minStockProducts);
    fromSlider.max = String(maxStockProducts);
    fromSlider.value = String(minStockFilteredProducts);
    const toSlider = createElement('input') as HTMLInputElement;
    toSlider.id = 'toSliderStock';
    toSlider.type = 'range';
    toSlider.min = String(minStockProducts);
    toSlider.max = String(maxStockProducts);
    toSlider.value = String(maxStockFilteredProducts);

    const formControl = createElement('div', 'form_control');
    const minPrice = createElement('input') as HTMLInputElement;
    minPrice.id = 'fromInput';
    minPrice.type = 'number';
    minPrice.min = String(minStockProducts);
    minPrice.max = String(maxStockProducts);

    const maxPrice = createElement('input') as HTMLInputElement;
    maxPrice.id = 'toInput';
    maxPrice.type = 'number';
    maxPrice.min = String(minStockProducts);
    maxPrice.max = String(maxStockProducts);

    if (productsFiltered.length !== 0) {
        minPrice.value = String(minStockFilteredProducts);
        maxPrice.value = String(maxStockFilteredProducts);
    } else {
        minPrice.value = '0';
        maxPrice.value = '0';
        maxPrice.style.width = '20%';
    }

    formControl.append(minPrice, maxPrice);
    filterPriceWrapper.append(rangeContainer);
    rangeContainer.append(slidersControl, formControl);
    slidersControl.append(fromSlider, toSlider);

    fillSlider(fromSlider, toSlider, '#C6C6C6', 'yellow', toSlider);
    setToggleAccessible(toSlider, toSlider);

    return filterPriceWrapper;
}
