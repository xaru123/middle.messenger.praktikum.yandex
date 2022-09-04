import Block from '../../services/block';
import Chat from '../../components/chat';
import DialogList from '../../components/dialogList';
import { tpl } from './tpl.hbs';
import './style.scss';

const chat = new Chat();

export default class LayoutChat extends Block<{}> {
  constructor() {
    super('div', {
      class: 'layout-char',
      dialogList: new DialogList(),
      chat,
    });
  }

  render(): Node {
    return this.compile(tpl) as Node;
  }
}
