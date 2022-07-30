import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import './style.scss';
import stringifyFunc from '../../utils/stringifyFunc';

Handlebars.registerPartial('button', tpl);

export default (id, value, classBtn, onClick) => {
  return tpl({id, value, classBtn, onClick});
}
