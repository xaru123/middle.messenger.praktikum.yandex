import Avatar from '../avatar';
import Block from '../../services/block';
import DialogItem from '../dialogItem';
import FormCreateChat from '../../forms/createChat';
import Icon, { TIcon } from '../icon';
import MessagesController from '../../controllers/messages';
import SearchBlock, { ISearchBlock } from '../searchBlock';
import { Modal } from '../modal';
import { store } from '../../store';
import { tpl } from './tpl.hbs';
import './style.scss';

import { ChatsController } from '../../controllers/chats';

interface IChat {
  class: string;
  chats: [];
  listBlockDialogItem: [];
  searchBlock: Block<ISearchBlock>;
  iconAddChat: Block<TIcon>;
}

const chatC = new ChatsController();

export default class DialogList extends Block<IChat> {
  chats: [];

  constructor() {
    const searchBlock = new SearchBlock();

    const iconAddChat = new Icon({
      value: 'add_comment',
      class: 'material-icons md-36 icon',
      onClick: () => {
        const newForm = new FormCreateChat();
        new Modal({
          headerTitle: 'Создать чат',
          listBlockContent: [newForm],
        });
      },
    });

    const newProps = {
      class: 'dialogs-block',
      chats: [],
      listBlockDialogItem: [],
      searchBlock,
      iconAddChat,
    } as IChat;
    super('div', newProps);
  }

  protected componentDidMount() {
    store.subscribe((state) => {
      this.setProps({
        chats: state.chats,
      });
    });
    const lastOpenedChat = localStorage.getItem('lastOpenedChat') as string;

    if (lastOpenedChat) {
      this.selectedDialogList(localStorage.getItem('lastOpenedChat'));
    }
    chatC.getChats(() => {
      if (lastOpenedChat) {
        this.openChatByToken(lastOpenedChat);
      }
    });

    store.subscribe(() => {
      const data = this.setChatsInfoToBlock();
      this.setProps({
        listBlockDialogItem: data,
      });
    });
  }

  setChatsInfoToBlock() {
    const list: Block<{}>[] = [];
    if (!this.props?.chats?.length) {
      return;
    }

    this.props.chats.forEach((chatInformation) => {
      const dialogItemCur = this.createNewDialogItem(chatInformation);
      list.push(dialogItemCur);
    });
    return list;
  }

  createNewDialogItem(chatInformation): Block<{}> {
    const avatar = this.addAvatarToDialogItem(chatInformation);
    const r = new DialogItem({});
    const pr = {
      ...chatInformation,
      avatar,
      classParentRow: chatInformation.id == localStorage.getItem('lastOpenedChat') ? 'selected' : '',
      onClick: () => {
        this.selectedDialogList.call(this, r.props.id);
      },
    };

    r.setProps(pr);
    return r as Block<{}>;
  }

  addAvatarToDialogItem(chatInformation) {
    return new Avatar({ src: chatInformation.avatar });
  }

  selectedDialogList(chatId) {
    store.setState({ listMessages: [] });
    MessagesController.leave();
    localStorage.setItem('lastOpenedChat', `${chatId}`);
    store.setState({ chatId });
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
    const chatId = localStorage.getItem('lastOpenedChat') as string;

    MessagesController.createWebSocket(idUsert, chatId, token);
  }

  render(): Node {
    return this.compile(tpl) as Node;
  }
}
