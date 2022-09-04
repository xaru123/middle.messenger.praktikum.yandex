import Avatar, { IAvatar } from '../avatar';
import Block from '../../services/block';
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

interface IChat {
  class: string;
  avatar: Block<IAvatar>;
  iconD: Block<TIcon>;
  sendMsg: Block<{}>;
  listMessages?: [];
}

export default class Chat extends Block<IChat> {
  handleDebounceScroll: Function;

  constructor() {
    const avatar = new Avatar({});
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
      class: `chat-block logic-block`,
      avatar,
      iconD,
      sendMsg,
      listMessages: [],
    } as IChat;
    super('div', newProps);
    this.handleDebounceScroll = debounce(this.handlerScroll.bind(this), 500);
  }

  componentDidMount() {
    store.subscribe((state) => {
      this.setProps({
        listMessages: state.listMessages,
        class: localStorage.getItem('lastOpenedChat') ? `${this.props.class} show` : `chat-block logic-block`,
      });
      if (localStorage.getItem('lastOpenedChat')) {
        this.scrollToLastMsg();
      }
    });
  }

  addEvents() {
    const chatDiv = this._element?.querySelector('.chat-block__main');
    chatDiv?.addEventListener('scroll', (e) => this.handleDebounceScroll(e));

    this._element?.querySelector('#li-add-user')!.addEventListener('click', (e) => {
      const newForm = new FormAddUser();
      new Modal({
        listBlockContent: [newForm],
        headerTitle: 'Добавить пользователя',
      });
      e.stopPropagation();
    });
    this._element?.querySelector('#li-del-user')!.addEventListener('click', (e) => {
      const newForm = new FormDeleteUser();
      new Modal({
        listBlockContent: [newForm],
        headerTitle: 'Удалить пользователя',
      });
      e.stopPropagation();
    });
    this._element?.querySelector('#li-del-chat')!.addEventListener('click', (e) => {
      const accept = confirm('Ты уверен, что хочешь удалить этот чат?');
      if (accept) {
        const chatId = localStorage.getItem('lastOpenedChat') as string;
        const chatIdFormatted = +chatId as number;
        chatC.deleteChat({ chatId: chatIdFormatted });
        localStorage.removeItem('lastOpenedChat');
        store.setState({ listMessages: [] });
      }
      e.stopPropagation();
    });
  }

  handlerScroll(evt: Event) {
    const list = evt.target as HTMLUListElement;
    if (list) {
      const height = list.scrollHeight;
      const screenHeight = list.offsetHeight;
      const scrolled = list.scrollTop;
      const threshold = height - screenHeight / 4;
      const position = scrolled + screenHeight;
      if ('listMessages' in this.props) {
        if (position >= threshold && this.props?.listMessages?.length) {
          this.scrollUp(this.props.listMessages.length);
        }
      }
    }
  }

  scrollUp(length: number) {
    console.log(length);
    if (length && length % 20 === 0) {
      const props = { offset: length } as IMessageGet;
      MessagesController.getMessages(props);
    }
  }

  scrollToLastMsg() {
    const list = this._element?.querySelector('.chat-block__main') as HTMLElement;
    list.scrollTo({
      top: list.scrollHeight,
    });
  }

  render(): Node {
    return this.compile(tpl) as Node;
  }
}
