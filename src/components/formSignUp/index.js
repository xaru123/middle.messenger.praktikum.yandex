import input from '../input';
import button from '../button';
import form from '../form';
import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import './style.scss';

Handlebars.registerPartial('form-sign-up', tpl);

let submitFunction = function(event) {
  document.location = '/auth/sign-in';
};

let data = {
  id: 'form-sign-up',
  listInput: [
    [input('email', 'Почта', 'text', 'form__input')],
    [input('login', 'Логин', 'text', 'form__input')],
    [input('first_name', 'Имя', 'text', 'form__input')],
    [input('second_name', 'Фамилия', 'text', 'form__input')],
    [input('phone', 'Телефон', 'tel', 'form__input')],
    [input('oldPassword', 'Пароль', 'password', 'form__input')],
    [
      input('newPassword', 'Пароль (еще раз)', 'password',
          'form__input')],
  ],
  listBtn: [
    button('btn-sign-in', 'Зарегистрироваться', 'form__button',
        submitFunction)],
};

export default (props = {}) => {
  return tpl(data);
}