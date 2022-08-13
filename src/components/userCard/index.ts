import { tpl } from './tpl.hbs';
import Block from '../../services/block';
import './style.scss';
import Avatar from '../avatar';
import Link from '../link';
import Modal from '../modal';
import ModalChangeImg from '../../modals/changeImg';

const avatar = new Avatar({
  src: '#',
  class: 'avatar_big avatar_can-change profile__avatar',
  onClick: () => {
    modal.show();
  },
});

const modal = new Modal({
  headerTitle: 'Загрузите файл',
  content: new ModalChangeImg({}),
});

const linkChangePassword = new Link({
  id: 'link',
  href: './change-password',
  class: 'link',
  value: 'Изменить пароль',
  target: '_self',
});
const linkChangeProfile = new Link({
  id: 'link',
  href: './change-profile',
  class: 'link',
  value: 'Изменить данные',
  target: '_self',
});

export default class UserCard extends Block {
  constructor(props) {
    const data = {
      order: [
        { field: 'mail', name: 'Почта' },
        { field: 'login', name: 'Логин' },
        { field: 'name', name: 'Имя' },
        { field: 'surname', name: 'Фамилия' },
        { field: 'nickname', name: 'Имя в чате' },
        { field: 'tel', name: 'Телефон' },
      ],
      headerTitle: 'Профиль',
      userInfo: {
        mail: 'pochta@yandex.ru',
        login: 'ivanivanov',
        name: 'Иван',
        surname: 'Иванов',
        nickname: 'Иван',
        tel: '+7 (909) 967 30 30',
        avatar: './static/avatar.png',
      },
    };
    const newProps = {
      class: 'user-card',
      avatar,
      modal,
      listBlockLinks: [linkChangeProfile, linkChangePassword],
      ...data,
      ...props,
    };
    super('div', newProps);
  }

  render(): Node {
    return this.compile(tpl) as Node;
  }
}
