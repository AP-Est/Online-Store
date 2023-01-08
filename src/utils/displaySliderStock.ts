import createElement from './createElement';
import { IFilterData, IProduct } from '../data/data';
import { fillSlider, setToggleAccessible } from './displaySliderPrice';

export default function displaySliderStock(products: IProduct[], filter: IFilterData) {
    const filterPriceWrapper = createElement('div', 'filterBrands__wrapper');
    filterPriceWrapper.classList.add('filter__wrapper');
    const filterPriceHeader = createElement('div', 'filterBrands__header');
    filterPriceHeader.classList.add('filter__header');
    filterPriceHeader.innerText = 'Stock';
    filterPriceWrapper.append(filterPriceHeader);

    //slider
    const rangeContainer = createElement('div', 'range_container');

    const minStockProducts = products.reduce((acc: number, date: IProduct) => {
        return date.stock < acc ? date.stock : acc;
    }, products[0].price);
    const maxStockProducts = products.reduce((acc: number, date: IProduct) => {
        return date.stock > acc ? date.stock : acc;
    }, products[0].price);

    const slidersControl = createElement('div', 'sliders_control');
    const fromSlider = createElement('input') as HTMLInputElement;
    fromSlider.id = 'fromSliderStock';
    fromSlider.type = 'range';
    fromSlider.min = String(minStockProducts);
    fromSlider.max = String(maxStockProducts);
    fromSlider.value = String(filter.minStock);
    const toSlider = createElement('input') as HTMLInputElement;
    toSlider.id = 'toSliderStock';
    toSlider.type = 'range';
    toSlider.min = String(minStockProducts);
    toSlider.max = String(maxStockProducts);
    toSlider.value = String(filter.maxStock);

    //numbers
    const formControl = createElement('div', 'form_control');
    const minPrice = createElement('input') as HTMLInputElement;
    minPrice.id = 'fromInput';
    minPrice.type = 'number';
    minPrice.min = String(minStockProducts);
    minPrice.max = String(maxStockProducts);
    minPrice.value = String(filter.minStock);

    const maxPrice = createElement('input') as HTMLInputElement;
    maxPrice.id = 'toInput';
    maxPrice.type = 'number';
    maxPrice.min = String(minStockProducts);
    maxPrice.max = String(maxStockProducts);
    maxPrice.value = String(filter.maxStock);
    //console.log('maxPrice.value', maxPrice.value);
    //console.log();

    formControl.append(minPrice, maxPrice);
    filterPriceWrapper.append(rangeContainer);
    rangeContainer.append(slidersControl, formControl);
    slidersControl.append(fromSlider, toSlider);

    fillSlider(fromSlider, toSlider, '#C6C6C6', 'yellow', toSlider);
    setToggleAccessible(toSlider, toSlider);

    return filterPriceWrapper;
}
