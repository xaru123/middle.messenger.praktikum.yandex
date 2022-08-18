import { tpl } from './tpl.hbs';
import Block from '../../services/block';
import Form from '../../components/form';
import Button from '../../components/button';
import Input from '../../components/input';
import './style.scss';

const btnSubmit = new Button({
  type: 'button',
  class: 'button form__button',
  value: 'Зарегистрироваться',
  disabled: 'disabled',
  onClick: function (e: Event) {
    e.preventDefault();
    document.location = '/settings/profile';
  },
});
const inputMail = new Input({
  type: 'text',
  id: 'email',
  label: 'Почта',
  class: 'input-group',
});
const inputLogin = new Input({
  type: 'text',
  id: 'login',
  label: 'Логин',
  class: 'input-group',
});
const inputName = new Input({
  type: 'text',
  id: 'first_name',
  label: 'Имя',
  class: 'input-group',
});
const inputName2 = new Input({
  type: 'text',
  id: 'second_name',
  label: 'Фамилия',
  class: 'input-group',
});

const inputPhone = new Input({
  type: 'tel',
  id: 'phone',
  label: 'Телефон',
  class: 'input-group',
});

const inputPass = new Input({
  type: 'password',
  id: 'oldPassword',
  label: 'Пароль',
  class: 'input-group',
});
const inputPassNew = new Input({
  type: 'password',
  id: 'newPassword',
  label: 'Пароль (еще раз)',
  class: 'input-group',
});

const formContent = new Form({
  id: 'form-sign-up',
  class: 'form flex__item',
  listBlockInputs: [inputMail, inputLogin, inputName, inputName2, inputPhone, inputPass, inputPassNew],
  listBlockBtn: [btnSubmit],
});

export default class FormSignUp extends Block {
  constructor() {
    super('div', {
      formContent,
      class: 'content-form',
      id: 'form-sign-up',
    });
  }

  render(): Node {
    return this.compile(tpl) as Node;
  }
}
