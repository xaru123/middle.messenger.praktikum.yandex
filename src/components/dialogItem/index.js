import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import avatar from '../avatar';
import './style.scss';

Handlebars.registerPartial('dialog-item', tpl);

export default (props) => {
  return tpl(props);
}