import { tpl } from './tpl.hbs';
import Block from '../../services/block';
import Form from '../../components/form';
import Button from '../../components/button';
import Input from '../../components/input';
import './style.scss';

const btnSubmit = new Button({
  type: 'button',
  class: 'button form__button',
  value: 'Авторизоваться',
  tabindex: 3,
  disabled: 'disabled',
  onClick: function (e) {
    e.preventDefault();
    document.location = '/settings/profile';
  },
});
const inputLogin = new Input({
  tabindex: 1,
  type: 'text',
  id: 'login',
  label: 'Логин',
  class: 'input-group',
});
const inputPassword = new Input({
  tabindex: 2,
  type: 'password',
  id: 'password',
  label: 'Пароль',
  class: 'input-group',
});

const formContent = new Form({
  id: 'form-sign-in',
  action: '/',
  method: 'post',
  class: 'form flex__item',
  listBlockInputs: [inputLogin, inputPassword],
  listBlockBtn: [btnSubmit],
});

export default class FormSignIn extends Block {
  constructor() {
    super('div', {
      formContent,
      class: 'content-form',
    });
  }

  attrDis() {}

  render(): Node {
    return this.compile(tpl) as Node;
  }
}
