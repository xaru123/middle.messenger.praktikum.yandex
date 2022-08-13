import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import './style.scss';
import mainLayOut from '../../../layout/main';
import layoutChat from '../../../layout/layoutChat';

Handlebars.registerPartial('dialogs', tpl);

export default (props = {}) => {
  return tpl({
    content: layoutChat,
  });
}

