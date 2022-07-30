import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import serverErrorLayout from '../../../layout/serverErrorLayout';

let data = {
  errorCode: 404,
  text: 'Не туда попали',
};
Handlebars.registerPartial('server-error-400', tpl(data));

export default () => {
  return tpl(data);
}

