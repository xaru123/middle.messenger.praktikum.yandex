import Avatar from '../avatar';
import Block from '../../services/block';
import Icon from '../icon';
import Link from '../link';
import { AuthController } from '../../controllers/auth';
import { store } from '../../store';
import { tpl } from './tpl.hbs';
import './style.scss';

export default class Menu extends Block<{}> {
  constructor() {
    const linkMsg = new Link({
      id: 'link',
      href: '/messenger',
      class: 'link menu__item menu__item-msg menu__item_center',
      value: new Icon({
        value: 'chat',
      }),
      target: '_self',
    });

    const linkSettings = new Link({
      id: 'link',
      href: '/settings',
      class: 'link menu__item menu__item-setting',
      value: new Icon({
        value: 'settings',
      }),
      target: '_self',
    });

    const linkExit = new Link({
      id: 'link',
      href: '/',
      class: 'link menu__item menu__item-exit',
      value: new Icon({
        value: 'logout',
      }),
      target: '_self',
      onClick: (e) => {
        const accept = confirm('Ты уверен, что хочешь выйти?');
        if (accept) {
          new AuthController().signOut();
        }
        e.preventDefault();
        e.stopPropagation();
      },
    });

    const avatar = new Avatar({});
    const newProps = {
      class: 'menu',
      avatar,
      listBlockLinks: [linkMsg, linkSettings, linkExit],
    };
    super('div', newProps);
  }
  protected componentDidMount() {
    store.subscribe((state) => {
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
