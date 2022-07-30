import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import './style.scss';

Handlebars.registerPartial('avatar', tpl);

export default (src, classAvatar,id) => {
  return tpl({src,classAvatar});
}
