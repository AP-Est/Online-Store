import '../styles/styleBase.scss';
import createElement from '../utils/createElement';
import getElement from '../utils/getElement';

const app = getElement('body') as HTMLElement;
const baseWrapper = createElement('div', '404__wrapper');
baseWrapper.textContent = 'Something wrong happened -- 404';
app.append(baseWrapper);
