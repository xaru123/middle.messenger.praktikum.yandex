import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import './style.scss';
import stringifyFunc from '../../utils/stringifyFunc';

Handlebars.registerPartial('link', tpl);

export default (
    id, text = 'Ссылка', href = '#', classA = '', target = '_self',
    onClick = '') => {
  return tpl({id, text, href, classA, target, onClick});
}
