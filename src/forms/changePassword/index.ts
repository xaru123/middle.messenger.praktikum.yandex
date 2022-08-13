import { tpl } from './tpl.hbs';
import Block from '../../services/block';
import Form from '../../components/form';
import Button from '../../components/button';
import Input from '../../components/input';

const btnSubmit = new Button({
  type: 'button',
  class: 'button form__button',
  value: 'Сохранить',
  title: 'Сохранить',
  onClick: function () {
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
const inputPassword = new Input({
  type: 'password',
  id: 'password',
  name: 'password',
  label: 'Пароль',
  class: 'input-group form__input',
});

const inputPasswordOld = new Input({
  type: 'password',
  id: 'oldPassword',
  name: 'oldPassword',
  label: 'Новый пароль',
  class: 'input-group form__input',
});
const inputPasswordNew = new Input({
  type: 'password',
  id: 'newPassword',
  name: 'newPassword',
  label: 'Новый пароль (еще раз)',
  class: 'input-group form__input',
});

const formContent = new Form({
  id: 'test',
  class: 'form flex__item',
  listBlockInputs: [inputPassword, inputPasswordOld, inputPasswordNew],
  listBlockBtn: [btnBack, btnSubmit],
});

export default class FormChangePassword extends Block {
  constructor(props) {
    const newProps = {
      formContent,
      class: 'content-form content-form-profile',
      headerTitle: 'Изменить пароль',
      ...props,
    };
    super('div', newProps);
  }

  render(): Node {
    return this.compile(tpl) as Node;
  }
}
