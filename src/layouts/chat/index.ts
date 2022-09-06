import Block from '../../services/block';
import Chat, { IChat } from '../../components/chat';
import DialogList from '../../components/dialogList';
import { tpl } from './tpl.hbs';
import './style.scss';

const chatsProps = {} as IChat;
const chat = new Chat(chatsProps);
const dialogList = new DialogList();

export default class LayoutChat extends Block<{}> {
  constructor() {
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
