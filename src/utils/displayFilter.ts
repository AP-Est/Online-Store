import createElement from './createElement';
import { IFilterData, IProduct } from '../data/data';
import displayFilterCategory from './displayFilterCategory';
import displayFilterBrands from './displayFilterBrands';
import displaySliderPrice from './displaySliderPrice';
import createButton from './createButton';

export default function displayFilter(products: IProduct[], filter: IFilterData) {
    const filters = createElement('div', 'filters');
    const filtersWrapper = createElement('div', 'filters__wrapper');
    const filtersButtonWrapper = createElement('div', 'filtersButton__wrapper');
    const filtersButtonReset = createButton('Reset', 'filters__button_reset');
    const filtersButtonCopy = createButton('Copy', 'filters__button_copy');
    const modelFilter1 = displayFilterCategory(products, filter) as HTMLElement; // TODo сюда прокинуть продукты и массив с фильтрами категорий
    const modelFilter2 = displayFilterBrands(products, filter) as HTMLElement; // TODo сюда прокинуть продукты и массив с фильтрами категорий
    const modelFilter3 = displaySliderPrice(products, filter) as HTMLElement;
    const modelFilter4 = createElement('div', 'modelFilter');

    filtersButtonWrapper.append(filtersButtonReset, filtersButtonCopy);
    filtersWrapper.append(filtersButtonWrapper, modelFilter1, modelFilter2, modelFilter3, modelFilter4);
    filters.append(filtersWrapper);

    return filters;
}
