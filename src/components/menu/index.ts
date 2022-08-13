import { tpl } from './tpl.hbs';
import Block from '../../services/block';
import './style.scss';

import Icon from '../icon';
import Avatar from '../avatar';
import Link from '../link';

const linkMsg = new Link({
  id: 'link',
  href: '/chats',
  class: 'link menu__item menu__item-msg menu__item_center',
  value: new Icon({
    value: 'chat',
  }),
  target: '_self',
});

const linkSettings = new Link({
  id: 'link',
  href: '/settings/profile',
  class: 'link menu__item menu__item-setting',
  value: new Icon({
    value: 'settings',
  }),
  target: '_self',
});

const linkExit = new Link({
  id: 'link',
  href: '/auth/sign-in',
  class: 'link menu__item menu__item-exit',
  value: new Icon({
    value: 'logout',
  }),
  target: '_self',
});
const avatar = new Avatar({
  src: '#',
});

export default class Menu extends Block {
  constructor() {
    const newProps = {
      class: 'menu',
      avatar,
      listBlockLinks: [linkMsg, linkSettings, linkExit],
    };
    super('div', newProps);
  }

  render(): Node {
    return this.compile(tpl) as Node;
  }
}
