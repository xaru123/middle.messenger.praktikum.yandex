import Block from '../../services/block';
import { tpl } from './tpl.hbs';
import './style.scss';

interface TModal {
  headerTitle: string;
  class?: string;
  listBlockContent: Block<{}>[];
  onSubmit?: (e) => void;
}

export class Modal extends Block<TModal> {
  constructor(props: TModal) {
    super('div', {
      class: 'modal modal-hidden',
      ...props,
    });
    this.setProps({
      onSubmit: (e) => {
        e.preventDefault();
        this.hide();
        return false;
      },
    });
    this.show();
  }

  addEvents() {
    this._element?.querySelector('#modal__btn-close')?.addEventListener('click', () => {
      this.hide();
    });
    super.addEvents();
  }

  protected removeEvents() {
    this._element?.querySelector('#modal__btn-close')?.removeEventListener('click', () => {
      this.hide();
    });
    super.removeEvents();
  }

  show() {
    document.body.append(this.getContent()!);
    super.show();
  }

  hide() {
    super.hide();
    this.destroy();
  }

  render(): Node {
    return this.compile(tpl) as Node;
  }
}
