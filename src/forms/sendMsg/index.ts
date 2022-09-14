import Block from '../../services/block';
import Icon from '../../components/icon';
import Input from '../../components/input';
import MessagesController, { IMessageSend } from '../../controllers/messages';
import { ChatsController } from '../../controllers/chats';
import { Form, FormDataFormatterInterface } from '../../components/form';
import { tpl } from './tpl.hbs';
import './style.scss';

export default class SendMsg extends Block<{}> {
  constructor() {
    const chatC = new ChatsController();

    const inputMsg = new Input({
      type: 'text',
      id: 'message',
      class: 'input-group',
    });
    const iconAttach = new Icon({
      value: 'add_reaction',
      class: 'material-icons_violet smile material-icons md-36 icon',
      onClick: (e: Event) => {
        e.preventDefault();
        const dropdown = document.querySelector('.emoji')!;
        dropdown.classList.toggle('show');
      },
    });
    const formContent = new Form<IMessageSend>({
      id: 'form-send-msg',
      action: '/',
      method: 'post',
      class: 'form flex__item',
      listBlockInputs: [iconAttach, inputMsg],
      listBlockBtn: [],
      submitCallback: (formData: FormDataFormatterInterface<IMessageSend>) => {
        const msg = formData.message;
        MessagesController.sendMessage(msg);
        chatC.getChats();
      },
    });

    super('div', {
      formContent,
      listEmoji: [
        '&#128522;',
        '&#128577;',
        '&#128549;',
        '&#128526;',
        '&#128541;',
        '&#128520;',
        '&#128527;',
        '&#128077;',
        '&#128078;',
        '&#9996;',
        '&#128139;',
        '&#128150;',
      ],
      class: 'content-form',
    });
  }
  handlerForSendMsg(e) {
    return new Promise((resolve) => {
      const dropdown = document.querySelector('.emoji')!;
      dropdown.classList.toggle('show');
      const msg = e.target.textContent as string;
      MessagesController.sendMessage(msg);
      return resolve('OK');
    });
  }

  addEvents() {
    this._element?.querySelectorAll('.emoji-item').forEach((htmlElement) => {
      htmlElement.addEventListener('click', this.handlerForSendMsg);
    });
    super.addEvents();
  }

  render(): Node {
    return this.compile(tpl) as Node;
  }
}
