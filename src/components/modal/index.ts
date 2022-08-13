import { tpl } from './tpl.hbs';
import Block from '../../services/block';
import './style.scss';

export default class Modal extends Block {
  constructor(props) {
    super('div', {
      class: 'modal modal-hidden',
      ...props,
    });
  }

  addEvents() {
    this._element!.querySelector('#modal__btn-close')!.addEventListener('click', () => {
      this.hide();
    });
    super.addEvents();
  }

  render(): Node {
    return this.compile(tpl) as Node;
  }
}
