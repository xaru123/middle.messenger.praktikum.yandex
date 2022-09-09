import Avatar from '../avatar';
import Block from '../../services/block';
import Link from '../link';
import { FormChangeAvatar } from '../../forms/changeAvatar';
import { IAvatar } from '../avatar';
import { Modal } from '../modal';
import { store } from '../../store';
import { tpl } from './tpl.hbs';
import './style.scss';

interface IUserCard {
  class?: string;
  avatar?: Block<IAvatar>;
  listBlockLinks?: Block<{}>[];
  order: Record<string, any>;
}

export default class UserCard extends Block<IUserCard> {
  constructor() {
    const dataSort = {
      order: [
        { field: 'email', name: 'Почта' },
        { field: 'login', name: 'Логин' },
        { field: 'first_name', name: 'Имя' },
        { field: 'second_name', name: 'Фамилия' },
        { field: 'display_name', name: 'Имя в чате' },
        { field: 'phone', name: 'Телефон' },
      ],
      userInfo: {},
    };
    const avatar = new Avatar({
      src: null,
      class: 'avatar_big avatar_can-change profile__avatar',
      onClick: () => {
        new Modal({
          headerTitle: 'Загрузите файл',
          listBlockContent: [new FormChangeAvatar()],
        });
      },
    });
    const linkChangePassword = new Link({
      id: 'link',
      href: '/settings/change/password',
      class: 'link',
      value: 'Изменить пароль',
      target: '_self',
    });
    const linkChangeProfile = new Link({
      id: 'link',
      href: '/settings/change/info',
      class: 'link',
      value: 'Изменить данные',
      target: '_self',
    });
    const newProps = {
      class: 'user-card',
      avatar,
      listBlockLinks: [linkChangeProfile, linkChangePassword],
      ...dataSort,
    } as IUserCard;
    super('div', newProps);
  }

  protected componentDidMount() {
    store.subscribe((state) => {
      this.setProps({
        userInfo: state.userInfo,
      });
      if (state?.userInfo?.avatar) {
        this.children.avatar.setProps({
          src: `https://ya-praktikum.tech/api/v2/resources/${state?.userInfo?.avatar}`,
        });
      }
    });
  }

  render(): Node {
    return this.compile(tpl) as Node;
  }
}
