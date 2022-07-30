import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import './style.scss';
import input from '../input';
import icon from '../button';

Handlebars.registerPartial('search-block', tpl);

export default () => {
  return tpl();
}
