import input from '../input';
import button from '../button';
import form from '../form';
import Handlebars from 'handlebars';
import tpl from './tpl.hbs';

Handlebars.registerPartial('form-change-password', tpl);

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
    [input('password', 'Пароль', 'password', 'form__input')],
    [input('oldPassword', 'Новый пароль', 'password', 'form__input')],
    [
      input('newPassword', 'Новый пароль (еще раз)', 'password',
          'form__input')],
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