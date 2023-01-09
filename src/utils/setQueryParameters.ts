import { IFilterData } from '../data/data';

export default function setQueryParameters(filter: IFilterData) {
    const url = new URL(location.href);
    url.searchParams.delete('category');
    url.searchParams.delete('brand');
    url.searchParams.delete('search');
    url.searchParams.delete('sort');
    url.searchParams.delete('minPrice');
    url.searchParams.delete('maxPrice');
    url.searchParams.delete('minStock');
    url.searchParams.delete('maxStock');
    url.searchParams.delete('view');
    let string = '';
    filter.categories.map((item) => {
        if (item !== '') {
            if (string === '') {
                string += item;
            } else {
                string += '_' + item;
            }
        }
    });
    if (string !== '') {
        url.searchParams.set('category', string);
    } else {
        url.searchParams.delete('category');
    }
    string = '';
    filter.brands.map((item) => {
        if (item !== '') {
            if (string === '') {
                string += item;
            } else {
                string += '_' + item;
            }
        }
    });
    if (string !== '') {
        url.searchParams.set('brand', string);
    } else {
        url.searchParams.delete('brand');
    }
    if (filter.search !== '') {
        url.searchParams.set('search', filter.search);
    } else {
        url.searchParams.delete('search');
    }
    if (filter.sort !== '') {
        url.searchParams.set('sort', filter.sort);
    } else {
        url.searchParams.delete('sort');
    }
    url.searchParams.set('minPrice', String(filter.minPrice));
    url.searchParams.set('maxPrice', String(filter.maxPrice));
    url.searchParams.set('minStock', String(filter.minStock));
    url.searchParams.set('maxStock', String(filter.maxStock));
    url.searchParams.set('view', filter.view);
    history.pushState(null, '', url);
}
