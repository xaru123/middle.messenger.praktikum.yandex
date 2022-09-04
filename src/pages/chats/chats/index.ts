import Block from '../../../services/block';
import LayoutChat from '../../../layouts/chat';
import LayoutMain from '../../../layouts/main';
import MessagesController from '../../../controllers/messages';
import { ChatsController } from '../../../controllers/chats';
import { store } from '../../../store';
import { tpl } from './tpl.hbs';

const chatC = new ChatsController();
const content = new LayoutChat();
const layout = new LayoutMain({
  layoutContent: content,
});
export default class Chats extends Block<{}> {
  constructor() {
    const newProps = {
      layout,
      class: 'content',
    };
    super('div', newProps);
  }

  protected componentDidMount() {
    setInterval(() => {
      chatC.getChats({}, false);
    }, 1000 * 30);
  }

  hide() {
    if (Object.keys(store.state?.chats).length) {
      MessagesController.leave();
    }
    store.setState({
      chats: [],
      listMessages: [],
    });
    localStorage.removeItem('lastOpenedChat');
    super.hide();
  }

  render(): Node {
    return this.compile(tpl) as Node;
  }
}
