import { tpl } from './tpl.hbs';
import Block from '../../services/block';
import './style.scss';
import DialogList from '../../components/dialogList';
import Chat from '../../components/chat';

const dialogList = new DialogList();
const chat = new Chat();

export default class LayoutChat extends Block {
  constructor() {
    dialogList.on('dialog:chat-open', chat.showChatBlock.bind(chat));
    super('div', {
      class: 'layout-char',
      dialogList,
      chat,
    });
  }

  render(): Node {
    return this.compile(tpl) as Node;
  }
}
