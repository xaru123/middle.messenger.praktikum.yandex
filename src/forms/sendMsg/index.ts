import { tpl } from './tpl.hbs';
import Block from '../../services/block';
import './style.scss';
import Form from '../../components/form';
import Input from '../../components/input';

const inputMsg = new Input({
  type: 'text',
  id: 'message',
  class: 'input-group',
  label: '',
});

const formContent = new Form({
  id: 'form-send-msg',
  method: 'post',
  class: 'form flex__item',
  listBlockInputs: [inputMsg],
});

export default class sendMsg extends Block {
  constructor() {
    super('div', {
      formContent,
      class: 'content-form',
    });
    this.on('form:emit-send', formContent.emitSubmit.bind(formContent));
  }

  sendRequest() {
    this.emit('form:emit-send');
  }

  render(): Node {
    return this.compile(tpl) as Node;
  }
}
