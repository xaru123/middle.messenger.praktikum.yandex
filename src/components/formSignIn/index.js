import input from '../input';
import button from '../button';
import form from '../form';
import Handlebars from 'handlebars';
import tpl from './tpl.hbs';

Handlebars.registerPartial('form-sign-in', tpl);

let submitFunction = function(event) {
  document.location = '/settings/profile';
};

let data = {
  id: 'form-sign-in',
  listInput: [
    [input('login', 'Логин', 'text', 'form__input')],
    [input('password', 'Пароль', 'password', 'form__input')],
  ],
  listBtn: [
    button('btn-sign-in', 'Авторизоваться', 'form__button',
        submitFunction)],
};

export default (props = {}) => {
  return tpl(data);
}
