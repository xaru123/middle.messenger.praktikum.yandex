import { tpl } from './tpl.hbs';
import Block from '../../../services/block';
import LayoutServerError from '../../../layouts/server';
import Link from '../../../components/link';

const link = new Link({
  id: 'link',
  href: '/chats',
  class: 'link server-error__item',
  value: 'Назад к чатам',
  target: '_self',
});

const layout = new LayoutServerError({
  errorCode: 500,
  text: 'Мы уже фиксим',
  link: link,
});

export default class Error400 extends Block {
  constructor() {
    const newProps = {
      layout,
      class: 'layout-server',
    };
    super('div', newProps);
  }

  render(): Node {
    return this.compile(tpl) as Node;
  }
}
