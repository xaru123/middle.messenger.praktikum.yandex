import { tpl } from './tpl.hbs';
import Block from '../../services/block';
import Button from '../../components/button';
import Input from '../../components/input';

const input = new Input({
  id: 'login-add',
  label: 'Логин',
  type: 'text',
  class: 'input-group',
});
const button = new Button({
  type: 'button',
  class: 'button form__button',
  disabled: 'disabled',
  value: 'Добавить',
});

export default class ModalAddUser extends Block {
  constructor(props: object) {
    const newProps = {
      input,
      button,
      class: 'modal-add-user',
      ...props,
    };
    super('div', newProps);
  }

  render(): Node {
    return this.compile(tpl) as Node;
  }
}
