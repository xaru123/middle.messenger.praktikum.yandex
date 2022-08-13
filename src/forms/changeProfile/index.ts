import { tpl } from './tpl.hbs';
import Block from '../../services/block';
import Form from '../../components/form';
import Button from '../../components/button';
import Input from '../../components/input';
import './style.scss';

const btnSubmit = new Button({
  type: 'button',
  class: 'button form__button',
  value: 'Сохранить',
  title: 'Сохранить',
  onClick: function (e: Event) {
    e.preventDefault();
    document.location = '/settings/profile';
  },
});
const btnBack = new Button({
  type: 'button',
  class: 'button form__button button_small',
  value: 'Назад',
  title: 'Назад',
  onClick: function () {
    document.location = '/settings/profile';
  },
});
const inputMail = new Input({
  type: 'text',
  id: 'email',
  name: 'email',
  label: 'Почта',
  class: 'input-group',
});
const inputLogin = new Input({
  type: 'text',
  id: 'login',
  name: 'login',
  label: 'Логин',
  class: 'input-group',
});
const inputName = new Input({
  type: 'text',
  id: 'first_name',
  name: 'first_name',
  label: 'Имя',
  class: 'input-group',
});
const inputName2 = new Input({
  type: 'text',
  id: 'second_name',
  name: 'second_name',
  label: 'Фамилия',
  class: 'input-group',
});

const inputPhone = new Input({
  type: 'tel',
  id: 'phone',
  name: 'phone',
  label: 'Телефон',
  class: 'input-group',
});

const inputNick = new Input({
  type: 'text',
  id: 'display_name',
  name: 'display_name',
  label: 'Имя в чате',
  class: 'input-group',
});

const formContent = new Form({
  id: 'form-change-profile',
  class: 'form flex__item',
  listBlockInputs: [inputMail, inputLogin, inputName, inputName2, inputNick, inputPhone],
  listBlockBtn: [btnBack, btnSubmit],
});

export default class ChangeProfile extends Block {
  constructor(props) {
    const newProps = {
      formContent,
      class: 'content-form content-form-profile',
      headerTitle: 'Изменить данные',
      ...props,
    };
    super('div', newProps);
  }

  render(): Node {
    return this.compile(tpl) as Node;
  }
}
