import Block from '../../services/block';
import Icon from '../../components/icon';
import Input from '../../components/input';
import MessagesController from '../../controllers/messages';
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
      value: 'attach_file',
      class: 'material-icons_dark material-icons md-36 icon attach_file',
    });
    const formContent = new Form({
      id: 'form-send-msg',
      action: '/',
      method: 'post',
      class: 'form flex__item',
      listBlockInputs: [iconAttach, inputMsg],
      listBlockBtn: [],
      submitCallback: (formData: FormDataFormatterInterface): Promise<string> => {
        return new Promise((resolve) => {
          const msg = formData.message as string;
          MessagesController.sendMessage(msg);
          chatC.getChats();
          return resolve('OK');
        });
      },
    });

    super('div', {
      formContent,
      class: 'content-form',
    });
  }

  render(): Node {
    return this.compile(tpl) as Node;
  }
}
