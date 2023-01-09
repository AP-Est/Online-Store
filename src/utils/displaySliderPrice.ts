import createElement from './createElement';
import { IFilterData, IProduct } from '../data/data';

export default function displaySliderPrice(products: IProduct[], filter: IFilterData, productsFiltered: IProduct[]) {
    const filterPriceWrapper = createElement('div', 'filterBrands__wrapper');
    filterPriceWrapper.classList.add('filter__wrapper');
    const filterPriceHeader = createElement('div', 'filterBrands__header');
    filterPriceHeader.classList.add('filter__header');
    filterPriceHeader.innerText = 'Price $';
    filterPriceWrapper.append(filterPriceHeader);

    const rangeContainer = createElement('div', 'range_container');

    const minPriceProducts = products.reduce((acc: number, date: IProduct) => {
        return date.price < acc ? date.price : acc;
    }, products[0].price);
    const maxPriceProducts = products.reduce((acc: number, date: IProduct) => {
        return date.price > acc ? date.price : acc;
    }, products[0].price);

    let minPriceFilteredProducts = 0;
    let maxPriceFilteredProducts = 0;
    if (productsFiltered.length !== 0) {
        minPriceFilteredProducts = productsFiltered.reduce((acc: number, date: IProduct) => {
            return date.price < acc ? date.price : acc;
        }, productsFiltered[0].price);
        maxPriceFilteredProducts = productsFiltered.reduce((acc: number, date: IProduct) => {
            return date.price > acc ? date.price : acc;
        }, productsFiltered[0].price);
    } else {
        minPriceFilteredProducts = minPriceProducts;
        maxPriceFilteredProducts = maxPriceProducts;
    }

    const slidersControl = createElement('div', 'sliders_control');
    const fromSlider = createElement('input') as HTMLInputElement;
    fromSlider.id = 'fromSlider';
    fromSlider.type = 'range';
    fromSlider.min = String(minPriceProducts);
    fromSlider.max = String(maxPriceProducts);
    fromSlider.value = String(minPriceFilteredProducts);
    const toSlider = createElement('input') as HTMLInputElement;
    toSlider.id = 'toSlider';
    toSlider.type = 'range';
    toSlider.min = String(minPriceProducts);
    toSlider.max = String(maxPriceProducts);
    toSlider.value = String(maxPriceFilteredProducts);
    const formControl = createElement('div', 'form_control');
    const minPrice = createElement('input') as HTMLInputElement;
    minPrice.id = 'fromInput';
    minPrice.type = 'number';
    minPrice.min = String(minPriceProducts);
    minPrice.max = String(maxPriceProducts);

    const maxPrice = createElement('input') as HTMLInputElement;
    maxPrice.id = 'toInput';
    maxPrice.type = 'number';
    maxPrice.min = String(minPriceProducts);
    maxPrice.max = String(maxPriceProducts);

    if (productsFiltered.length !== 0) {
        minPrice.value = String(minPriceFilteredProducts);
        maxPrice.value = String(maxPriceFilteredProducts);
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

export function fillSlider(
    from: HTMLInputElement,
    to: HTMLInputElement,
    sliderColor: string,
    rangeColor: string,
    controlSlider: HTMLInputElement
) {
    const rangeDistance = Number(to.max) - Number(to.min);
    const fromPosition = Number(from.value) - Number(to.min);
    const toPosition = Number(to.value) - Number(to.min);
    controlSlider.style.background = `linear-gradient(
        to right,
        ${sliderColor} 0%,
        ${sliderColor} ${(fromPosition / rangeDistance) * 100}%,
        ${rangeColor} ${(fromPosition / rangeDistance) * 100}%,
        ${rangeColor} ${(toPosition / rangeDistance) * 100}%, 
        ${sliderColor} ${(toPosition / rangeDistance) * 100}%, 
        ${sliderColor} 100%)`;
}

export function setToggleAccessible(currentTarget: HTMLInputElement, toSlider: HTMLInputElement) {
    if (Number(currentTarget.value) <= 0) {
        toSlider.style.zIndex = '2';
    } else {
        toSlider.style.zIndex = '0';
    }
}
