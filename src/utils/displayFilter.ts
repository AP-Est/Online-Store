import createElement from './createElement';
import { IFilterData, IProduct } from '../data/data';
import displayFilterCategory from './displayFilterCategory';
import displayFilterBrands from './displayFilterBrands';
import displaySliderPrice from './displaySliderPrice';
import createButton from './createButton';
import displaySliderStock from './displaySliderStock';

export default function displayFilter(products: IProduct[], filter: IFilterData, productsFiltered: IProduct[]) {
    const filters = createElement('div', 'filters');
    const filtersWrapper = createElement('div', 'filters__wrapper');
    const filtersButtonWrapper = createElement('div', 'filtersButton__wrapper');
    const filtersButtonReset = createButton('Reset', 'filters__button_reset');
    const filtersButtonCopy = createButton('Copy', 'filters__button_copy');
    const modelFilterCategory = displayFilterCategory(products, filter, productsFiltered) as HTMLElement;
    const modelFilterBrands = displayFilterBrands(products, filter, productsFiltered) as HTMLElement;
    const modelFilterPrice = displaySliderPrice(products, filter, productsFiltered) as HTMLElement;
    const modelFilterStock = displaySliderStock(products, filter, productsFiltered) as HTMLElement;

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
