import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import './style.scss';

Handlebars.registerPartial('icon', tpl);

export default (id, classIcon, onClick) => {
  return tpl({id, classIcon, onClick});
}
