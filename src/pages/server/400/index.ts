import Block from '../../../services/block';
import LayoutServerError from '../../../layouts/server';
import Link from '../../../components/link';
import { tpl } from './tpl.hbs';

const link = new Link({
  id: 'link',
  href: '/messenger',
  class: 'link server-error__item',
  value: 'Назад к чатам',
});

const layout = new LayoutServerError({
  errorCode: 404,
  text: 'Не туда попали',
  link: link,
});

export default class Error400 extends Block<{}> {
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
