import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import serverErrorLayout from '../../../layout/serverErrorLayout';

let data = {
  errorCode: 500,
  text: 'Мы уже фиксим',
};
Handlebars.registerPartial('serer-error-500', tpl(data));

export default () => {
  return tpl(data);
}
