import { tpl } from './tpl.hbs';
import Block from '../../../services/block';
import LayoutMain from '../../../layouts/main';
import LayoutChat from '../../../layouts/chat';

const content = new LayoutChat();
const layout = new LayoutMain({
  layoutContent: content,
});
export default class Chats extends Block {
  constructor() {
    const newProps = {
      layout,
      class: 'content',
    };
    super('div', newProps);
  }

  render(): Node {
    return this.compile(tpl) as Node;
  }
}
