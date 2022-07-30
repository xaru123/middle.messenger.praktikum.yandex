import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import './style.scss';

Handlebars.registerPartial('server-error-layout', tpl);

export default (errorCode, text) => {
  return tpl({errorCode, text});
}

