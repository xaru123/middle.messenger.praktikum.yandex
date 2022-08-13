import input from '../input';
import button from '../button';
import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import './style.scss';

Handlebars.registerPartial('form', tpl);

export default (id, listInput, listBtn) => {
  return tpl({id, listInput, listBtn});
}
