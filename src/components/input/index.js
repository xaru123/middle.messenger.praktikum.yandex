import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import './style.scss';

Handlebars.registerPartial('input', tpl);

export default (id, title = '', type, classInput, placeholder = '') => {
  return tpl({id, title, type, classInput, placeholder});
}
