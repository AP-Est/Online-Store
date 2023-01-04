import createElement from './createElement';
import { IFilterData, IProduct } from '../data/data';

export default function displaySliderPrice(products: IProduct[], filter: IFilterData) {
    const filterPriceWrapper = createElement('div', 'filterBrands__wrapper');
    filterPriceWrapper.classList.add('filter__wrapper');
    const filterPriceHeader = createElement('div', 'filterBrands__header');
    filterPriceHeader.classList.add('filter__header');
    filterPriceHeader.innerText = 'Price';
    filterPriceWrapper.append(filterPriceHeader);

    //slider
    const rangeContainer = createElement('div', 'range_container');

    const slidersControl = createElement('div', 'sliders_control');
    const fromSlider = createElement('input') as HTMLInputElement;
    fromSlider.id = 'fromSlider';
    fromSlider.type = 'range';
    fromSlider.value = '10';
    fromSlider.min = '0';
    fromSlider.max = '100';
    const toSlider = createElement('input') as HTMLInputElement;
    toSlider.id = 'toSlider';
    toSlider.type = 'range';
    toSlider.value = '40';
    toSlider.min = '0';
    toSlider.max = '100';

    //numbers
    const formControl = createElement('div', 'form_control');
    const minPrice = createElement('p', 'price');
    minPrice.textContent = '20';
    const maxPrice = createElement('p', 'price');
    maxPrice.textContent = '20000';

    formControl.append(minPrice, maxPrice);
    filterPriceWrapper.append(rangeContainer);
    rangeContainer.append(slidersControl, formControl);
    slidersControl.append(fromSlider, toSlider);

    return filterPriceWrapper;
}
