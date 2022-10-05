import Avatar, { IAvatar } from '../avatar';
import Block from '../../services/block';
import Confirm from '../confirm';
import Icon, { TIcon } from '../icon';
import MessagesController, { IMessageGet } from '../../controllers/messages';
import SendMsg from '../../forms/sendMsg';
import debounce from '../../utils/debounce';
import { ChatsController } from '../../controllers/chats';
import { FormAddUser } from '../../forms/addUser';
import { FormDeleteUser } from '../../forms/deleteUser';
import { Modal } from '../modal';
import { store } from '../../store';
import { tpl } from './tpl.hbs';
import './style.scss';

const chatC = new ChatsController();

export interface IChat {
  class?: string;
  chatName?: string;
  userAvatar?: Block<IAvatar>;
  iconD?: Block<TIcon>;
  sendMsg?: Block<{}>;
  listMessages?: [];
}

const userAvatar = new Avatar({});

export default class Chat extends Block<IChat> {
  handleDebounceScroll: Function;
  elementChat: HTMLElement;

  constructor(props?: IChat) {
    const iconD = new Icon({
      value: 'more_vert',
      class: 'icon__msg dropdown-btn material-icons_violet material-icons md-36 icon',
      onClick: () => {
        const dropdown = document.querySelector('.dropdown-content')!;
        dropdown.classList.add('clicked');
      },
    });
    const sendMsg = new SendMsg();

    const newProps = {
      ...props,
      class: `chat-block logic-block`,
      userAvatar,
      iconD,
      chatName: '',
      sendMsg,
      listMessages: [],
    } as IChat;
    super('div', newProps);
    this.handleDebounceScroll = debounce((e: Event) => this.handlerScroll(e), 500);
  }

  componentDidMount() {
    store.subscribe((state) => {
      if (!state.listMessages.length) {
        return [];
      }
      const lastMsg = state.listMessages[state.listMessages.length - 1];
      if (!('chat_id' in lastMsg)) {
        this.scrollToMsg(this.elementChat.scrollHeight);
      } else {
        this.scrollToMsg(this.elementChat.scrollHeight / 4);
      }
      this.children.sendMsg?._element?.querySelector('input')?.focus();
    });
  }

  addEvents() {
    this.elementChat = this._element?.querySelector('.chat-block__main') as HTMLElement;
    this.elementChat?.addEventListener('scroll', (e) => this.handleDebounceScroll(e));
    this._element?.querySelector('#li-add-user')?.addEventListener('click', this.hadlerModalAddUser);
    this._element?.querySelector('#li-del-user')?.addEventListener('click', this.hadlerModalDelUser);
    this._element?.querySelector('#li-del-chat')?.addEventListener('click', this.hadlerModalDelChat);

    super.addEvents();
  }

  hadlerModalAddUser(e: Event) {
    e.preventDefault();
    const newForm = new FormAddUser();
    new Modal({
      listBlockContent: [newForm],
      headerTitle: 'Добавить пользователя',
    });
    document.querySelector('.dropdown-content')!.classList.remove('clicked');
  }

  hadlerModalDelUser(e: Event) {
    e.preventDefault();
    const newForm = new FormDeleteUser();
    new Modal({
      listBlockContent: [newForm],
      headerTitle: 'Удалить пользователя',
    });
    document.querySelector('.dropdown-content')!.classList.remove('clicked');
  }

  hadlerModalDelChat(e: Event) {
    const newM = new Modal({
      listBlockContent: [],
      headerTitle: 'Требуется подтверждение',
    });

    const newForm = new Confirm({
      question: 'Ты уверен, что хочешь удалить этот чат ?',
      acceptFunction: () => {
        const chatId = localStorage.getItem('lastOpenedChat') as string;
        const chatIdFormatted = +chatId as number;
        chatC.deleteChat({ chatId: chatIdFormatted });
        localStorage.removeItem('lastOpenedChat');
        store.setState({ listMessages: [] });

        newM.hide();
      },
    });
    newM.setProps({ listBlockContent: [newForm] });
    newM.show();
    document.querySelector('.dropdown-content')!.classList.remove('clicked');
    e.stopPropagation();
  }

  removeEvents() {
    this._element
      ?.querySelector('.chat-block__main')
      ?.removeEventListener('scroll', (e) => this.handleDebounceScroll(e));
    this._element?.querySelector('#li-add-user')?.removeEventListener('click', this.hadlerModalAddUser);
    this._element?.querySelector('#li-del-user')?.removeEventListener('click', this.hadlerModalDelUser);
    this._element?.querySelector('#li-del-chat')?.removeEventListener('click', this.hadlerModalDelChat);
    super.removeEvents();
  }

  handlerScroll(e: Event) {
    e.preventDefault();
    const list = e.target as HTMLUListElement;
    if (list) {
      if ('listMessages' in this.props) {
        if (list.scrollTop == 0 && this.props?.listMessages?.length) {
          this.loadOldMsg(this.props.listMessages.length);
        }
      }
    }
  }

  loadOldMsg(length: number) {
    if (length && length % 20 === 0) {
      const props = { offset: length } as IMessageGet;
      MessagesController.getMessages(props);
    }
  }

  scrollToMsg(position: number) {
    this.elementChat?.scrollTo({
      top: position,
    });
  }

  render(): Node {
    return this.compile(tpl) as Node;
  }
}
