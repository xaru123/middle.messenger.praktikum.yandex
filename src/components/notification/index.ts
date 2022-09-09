import Block from '../../services/block';
import { tpl } from './tpl.hbs';
import './style.scss';

enum TYPE {
  'success' = 'Отлично :)',
  'danger' = 'Ошибочка вышла :(',
  'warning' = 'Что-то не так :(',
  'info' = 'O! ',
}

interface TNotification {
  notificationType: TYPE;
  title: string;
  text: string;
  class: string;
  timeout: number;
}

export class Notification extends Block<TNotification> {
  private _btnClose: HTMLElement;

  constructor(type: string, text: string, timeout = 5000) {
    const newProps = {
      notificationType: type,
      title: TYPE[type],
      text: text,
      class: 'notification',
      timeout: timeout,
    } as TNotification;
    super('div', newProps);

    this._btnClose = this.getContent()?.querySelector('.btn-close') as HTMLElement;
    this.show();
  }

  addEvents() {
    this._btnClose?.addEventListener('click', this.hide.bind(this));

    setTimeout(() => {
      this.hide();
    }, this.props.timeout);
  }

  show() {
    document.body.append(this.getContent()!);
  }

  hide() {
    this.destroy();
  }

  render(): Node {
    return this.compile(tpl) as Node;
  }
}
