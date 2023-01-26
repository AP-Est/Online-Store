import createElement from './createElement';
import { IFilterData, IProduct } from '../types/types';
import createFilterCategory from './createFilterCategory';
import createFilterBrands from './createFilterBrands';
import createSliderPrice from './createSliderPrice';
import createButton from './createButton';
import createSliderStock from './createSliderStock';

export default function displayFilter(products: IProduct[], filter: IFilterData, productsFiltered: IProduct[]) {
    const filters = createElement('div', 'filters');
    const filtersWrapper = createElement('div', 'filters__wrapper');
    const filtersButtonWrapper = createElement('div', 'filtersButton__wrapper');
    const filtersButtonReset = createButton('Reset', 'filters__button_reset');
    const filtersButtonCopy = createButton('Copy', 'filters__button_copy');
    const modelFilterCategory = createFilterCategory(products, filter, productsFiltered) as HTMLElement;
    const modelFilterBrands = createFilterBrands(products, filter, productsFiltered) as HTMLElement;
    const modelFilterPrice = createSliderPrice(products, filter, productsFiltered) as HTMLElement;
    const modelFilterStock = createSliderStock(products, filter, productsFiltered) as HTMLElement;

    filtersButtonWrapper.append(filtersButtonReset, filtersButtonCopy);
    filtersWrapper.append(
        filtersButtonWrapper,
        modelFilterCategory,
        modelFilterBrands,
        modelFilterPrice,
        modelFilterStock
    );
    filters.append(filtersWrapper);

    return filters;
}
