import createElement from './createElement';
import { IFilterData, IProduct } from '../data/data';

export default function displaySliderPrice(products: IProduct[], filter: IFilterData) {
    const filterPriceWrapper = createElement('div', 'filterBrands__wrapper');
    filterPriceWrapper.classList.add('filter__wrapper');
    const filterPriceHeader = createElement('div', 'filterBrands__header');
    filterPriceHeader.classList.add('filter__header');
    filterPriceHeader.innerText = 'Price $';
    filterPriceWrapper.append(filterPriceHeader);

    //slider
    const rangeContainer = createElement('div', 'range_container');

    const minPriceProducts = products.reduce((acc: number, date: IProduct) => {
        return date.price < acc ? date.price : acc;
    }, products[0].price);
    const maxPriceProducts = products.reduce((acc: number, date: IProduct) => {
        return date.price > acc ? date.price : acc;
    }, products[0].price);

    const slidersControl = createElement('div', 'sliders_control');
    const fromSlider = createElement('input') as HTMLInputElement;
    fromSlider.id = 'fromSlider';
    fromSlider.type = 'range';
    fromSlider.min = String(minPriceProducts);
    fromSlider.max = String(maxPriceProducts);
    fromSlider.value = String(filter.minPrice);
    const toSlider = createElement('input') as HTMLInputElement;
    toSlider.id = 'toSlider';
    toSlider.type = 'range';
    toSlider.min = String(minPriceProducts);
    toSlider.max = String(maxPriceProducts);
    toSlider.value = String(filter.maxPrice);
    //console.log('fromSlider.min', fromSlider.min);
    //console.log('fromSlider.max', fromSlider.max);
    //console.log('fromSlider.value', fromSlider.value);
    //console.log('toSlider.value', toSlider.value);
    //console.log('filter.maxPrice', filter.maxPrice);
    //console.log('maxPriceProducts', maxPriceProducts);

    //numbers
    const formControl = createElement('div', 'form_control');
    const minPrice = createElement('input') as HTMLInputElement;
    minPrice.id = 'fromInput';
    minPrice.type = 'number';
    minPrice.min = String(minPriceProducts);
    minPrice.max = String(maxPriceProducts);
    minPrice.value = String(filter.minPrice);

    const maxPrice = createElement('input') as HTMLInputElement;
    maxPrice.id = 'toInput';
    maxPrice.type = 'number';
    maxPrice.min = String(minPriceProducts);
    maxPrice.max = String(maxPriceProducts);
    maxPrice.value = String(filter.maxPrice);
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

function controlFromSlider(fromSlider: HTMLInputElement, toSlider: HTMLInputElement, fromInput: HTMLInputElement) {
    const [from, to] = getParsed(fromSlider, toSlider);
    fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
    if (from > to) {
        fromSlider.value = String(to);
        fromInput.value = String(to);
    } else {
        fromInput.value = String(from);
    }
}

// function controlToSlider(fromSlider: HTMLInputElement, toSlider: HTMLInputElement, toInput: HTMLInputElement) {
//     const [from, to] = getParsed(fromSlider, toSlider);
//     fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
//     setToggleAccessible(toSlider, toSlider);
//     if (from <= to) {
//         toSlider.value = String(to);
//         toInput.value = String(to);
//     } else {
//         toInput.value = String(from);
//         toSlider.value = String(from);
//     }
// }

function getParsed(currentFrom: HTMLInputElement, currentTo: HTMLInputElement) {
    const from = parseInt(currentFrom.value, 10);
    const to = parseInt(currentTo.value, 10);
    return [from, to];
}

function fillSlider(
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

function setToggleAccessible(currentTarget: HTMLInputElement, toSlider: HTMLInputElement) {
    console.log('setToggleAccessible toSlider', toSlider);
    if (Number(currentTarget.value) <= 0) {
        toSlider.style.zIndex = '2';
    } else {
        toSlider.style.zIndex = '0';
    }
}
