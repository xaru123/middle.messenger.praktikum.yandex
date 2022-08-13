import { tpl } from './tpl.hbs';
import Block from '../../services/block';
import './style.scss';
import Avatar from '../avatar';
import Icon from '../icon';
import Modal from '../modal';
import ModalAddUser from '../../modals/addUser';
import ModalDelUser from '../../modals/delUser';
import SendMsg from '../../forms/sendMsg';

const avatar = new Avatar({});
const modal = new Modal({});
const sendMsg = new SendMsg();

const iconD = new Icon({
  value: 'more_vert',
  class: 'icon__msg dropdown-btn material-icons_violet material-icons md-36 icon',
});
const iconAttach = new Icon({
  value: 'attach_file',
  class: 'material-icons_dark material-icons md-36 icon',
});
const iconArrow = new Icon({
  value: 'arrow_circle_right',
  class: 'material-icons_dark material-icons md-36 icon',
  onClick: () => {
    iconArrow.emit('chat:click-btn-send');
  },
});

const msgList = [
  {
    type: 'from',
    text:
      'ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd' +
      'ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd',
    time: '12:20',
  },
  { type: 'from', text: 'dddddddddd', time: '12:20' },
  { type: 'to', text: 'eeee', time: 'ПН, 12:20' },
  { type: 'from', text: 'dddddddddddddddddddd', time: '12:20' },
  { type: 'to', text: 'e', time: '12:20' },
  { type: 'to', text: 'eeee', time: '12:20' },
  { type: 'to', text: 'eeee', time: '12:20' },
  { type: 'to', text: 'eeee', time: '12:20' },
  { type: 'to', text: 'eeee', time: '12:20' },
  { type: 'to', text: 'eeee', time: '12:20' },
  { type: 'to', text: 'eeee', time: '12:20' },
  { type: 'to', text: 'eeee', time: '12:20' },
  { type: 'to', text: 'eeee', time: '12:20' },
  { type: 'to', text: 'eeee', time: '12:20' },
  { type: 'to', text: 'eeee', time: '12:20' },
  { type: 'to', text: 'eeee', time: '12:20' },
  { type: 'to', text: 'eeee', time: '12:20' },
];

export default class Chat extends Block {
  constructor() {
    iconArrow.on('chat:click-btn-send', sendMsg.sendRequest.bind(sendMsg));

    const newProps = {
      class: 'chat-block logic-block flex flex_direction_column',
      avatar,
      iconAttach,
      iconArrow,
      iconD,
      modal,
      sendMsg,
      msgList,
    };
    super('div', newProps);
  }

  protected addEvents() {
    const dropdown = this._element!.querySelector('.dropdown-content')!;

    this._element!.querySelector('.dropdown-btn')!.addEventListener('click', () => {
      dropdown.classList.add('clicked');
    });

    this._element!.querySelector('#li-add-user')!.addEventListener('click', () => {
      const contentModal = new ModalAddUser({});
      modal.setProps({ content: contentModal, headerTitle: 'Добавить пользователя' });
      modal.show();
    });
    this._element!.querySelector('#li-del-user')!.addEventListener('click', () => {
      const contentModal = new ModalDelUser({});
      modal.setProps({ content: contentModal, headerTitle: 'Удалить пользователя' });
      modal.show();
    });

    super.addEvents();
  }

  showChatBlock(signShow) {
    if (signShow) {
      this._element?.classList.add('show');
    } else {
      this._element?.classList.remove('show');
    }
  }

  render(): Node {
    return this.compile(tpl) as Node;
  }
}
