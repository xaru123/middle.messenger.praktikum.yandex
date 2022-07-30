import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import './style.scss';
import icon from '../icon';
import avatar from '../avatar';

Handlebars.registerPartial('menu', tpl);

export default () => {
  return tpl();
}
