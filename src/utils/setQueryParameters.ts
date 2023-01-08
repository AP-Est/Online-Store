import { IFilterData } from '../data/data';

export default function setQueryParameters(filter: IFilterData) {
    console.log('setQueryParameters filter', filter);
    //window.location.search = '';
    const url = new URL(location.href);
    // console.log('setQueryParameters filter', filter);
    url.searchParams.delete('category');
    url.searchParams.delete('brand');
    url.searchParams.delete('search');
    url.searchParams.delete('sort');
    url.searchParams.delete('minPrice');
    url.searchParams.delete('maxPrice');
    let string = '';
    filter.categories.map((item) => {
        if (item !== '') {
            // console.log('setQueryParameters item', item);
            if (string === '') {
                string += item;
            } else {
                string += '_' + item;
            }
        }
    });
    if (string !== '') {
        //console.log('setQueryParameters string', string);
        url.searchParams.set('category', string);
    } else {
        url.searchParams.delete('category');
    }
    //console.log('url', url);
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
    // console.log('setQueryParameters url:', url);
    history.pushState(null, '', url);
}
