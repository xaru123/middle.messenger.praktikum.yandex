import input from '../input';
import button from '../button';
import form from '../form';
import Handlebars from 'handlebars';
import tpl from './tpl.hbs';

Handlebars.registerPartial('form-change-profile', tpl);

let backFunction = function(event) {
  document.location = '/settings/profile';
};
let submitFunction = function(event) {
  document.location = '/settings/profile';
};

let data = {
  id: 'form-sign-up',
  headerTitle: 'Изменить данные',
  listInput: [
    [input('email', 'Почта', 'text', 'form__input')],
    [input('login', 'Логин', 'text', 'form__input')],
    [input('first_name', 'Имя', 'text', 'form__input')],
    [input('second_name', 'Фамилия', 'text', 'form__input')],
    [input('display_name', 'Имя в чате', 'text', 'form__input')],
    [input('phone', 'Телефон', 'tel', 'form__input')],

  ],
  listBtn: [
    button('btn-back', 'Назад', 'form__button button_small',
        backFunction),
    button('btn-save-profile', 'Сохранить', 'form__button',
        submitFunction)],
};

export default (props = {}) => {
  return tpl(data);
}