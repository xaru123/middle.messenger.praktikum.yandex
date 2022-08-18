import { tpl } from './tpl.hbs';
import './style.scss';
import Block from '../../services/block';
import Button from '../../components/button';
import Link from '../../components/link';

const link = new Link({
  id: 'link',
  href: '#',
  class: 'link',
  value: 'Выбрать файл на компьютере',
  target: '_self',
});
const button = new Button({
  type: 'button',
  class: 'button form__button',
  value: 'Поменять',
});

export default class ModalChangeImg extends Block {
  constructor(props: object) {
    const newProps = {
      link,
      button,
      class: 'modal-change-img',
      ...props,
    };
    super('div', newProps);
  }

  render(): Node {
    return this.compile(tpl) as Node;
  }
}
