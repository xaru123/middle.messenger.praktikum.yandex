import Avatar from '../../../components/avatar';
import Block from '../../../services/block';
import DialogItem from '../../../components/dialogItem';
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
  timer;

  constructor() {
    const newProps = {
      layout,
      class: 'content',
    };
    super('div', newProps);
  }

  protected componentDidMount() {
    const lastOpenedChat = localStorage.getItem('lastOpenedChat') as string;
    if (lastOpenedChat) {
      this.selectedDialogList(localStorage.getItem('lastOpenedChat'));
    }
    chatC.getChats(() => {
      if (lastOpenedChat) {
        this.openChatByToken(lastOpenedChat);
      }
    });

    store.subscribe((state) => {
      content.children.chat.setProps({
        listMessages: state.listMessages,
        class: localStorage.getItem('lastOpenedChat') ? `chat-block logic-block show` : `chat-block logic-block`,
      });

      const data = this.setChatsInfoToBlock(state.chats);
      content.children.dialogList.setProps({
        listBlockDialogItem: data,
      });

      this.setHeaderChat(state.chats);
    });

    // this.timer = setInterval(() => {
    //   chatC.getChats({}, false);
    // }, 1000 * 30);
  }

  setHeaderChat(chats) {
    if (!chats.length) {
      return;
    }
    const chatId = localStorage.getItem('lastOpenedChat') as string;
    const chatIdFormatted = +chatId as number;
    const currentChat = chats.filter((chat) => {
      if (+chat.id == chatIdFormatted) {
        return chat;
      }
    });

    if (currentChat.length) {
      this.children.layout.children.layoutContent.children.chat.setProps({ chatName: currentChat[0].title });
    }
  }

  setChatsInfoToBlock(chats) {
    return chats.map((chatInformation) => this.createNewDialogItem(chatInformation));
  }

  addAvatarToDialogItem(chatInformation) {
    return new Avatar({ src: chatInformation.avatar });
  }

  createNewDialogItem(chatInformation): Block<{}> {
    const avatar = this.addAvatarToDialogItem(chatInformation);
    const r = new DialogItem({ chatId: chatInformation.id });
    const pr = {
      ...chatInformation,
      avatar,
      classParentRow: chatInformation.id == localStorage.getItem('lastOpenedChat') ? 'selected' : '',
      onClick: (e) => {
        this.selectedDialogList.call(this, r.props.id);
        e.preventDefault();
      },
    };

    r.setProps(pr);
    return r as Block<{}>;
  }

  selectedDialogList(chatId) {
    store.setState({ listMessages: [] });
    MessagesController.leave();
    localStorage.setItem('lastOpenedChat', `${chatId}`);
    this.openChatByToken(chatId);
  }

  openChatByToken(chatId: string) {
    if (!chatId) {
      return;
    }
    const chatIdFormatter = +chatId as number;
    chatC.requestTokenByChatId(chatIdFormatter).then((token) => {
      this.createConnect(token);
    });
  }

  createConnect(token) {
    let idUsert;
    if ('id' in store.state?.userInfo) {
      idUsert = store.state?.userInfo?.id;
    }
    if (!idUsert) {
      return;
    }
    const chatId = localStorage.getItem('lastOpenedChat') as string;
    MessagesController.createWebSocket(idUsert, chatId, token);
  }

  show() {
    chatC.getChats(() => {});
    super.show();
  }

  hide() {
    this._element?.querySelector('.dialog-list__row.selected')?.classList.remove('selected');
    const lastChat = localStorage.getItem('lastOpenedChat');
    localStorage.removeItem('lastOpenedChat');
    if (lastChat) {
      MessagesController.leave();
    }
    store.setState({
      chats: [],
      listMessages: [],
    });
    clearInterval(this.timer);
    super.hide();
  }

  render(): Node {
    return this.compile(tpl) as Node;
  }
}
