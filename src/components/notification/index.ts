import Block from '../../services/block';
import { tpl } from './tpl.hbs';
import './style.scss';

enum TYPEN {
  'success' = 'Отлично :)',
  'danger' = 'Ошибочка вышла :(',
  'warning' = 'Что-то не так :(',
  'info' = 'Информация! ',
}

interface TNotification {
  notificationType: TYPEN;
  title: string;
  text: string;
  class: string;
  timeout: number;
}

export class Notification extends Block<TNotification> {
  constructor(type: string, text: string, timeout = 5000) {
    // @ts-ignore
    const titleNotification = TYPEN[type] as string;
    const newProps = {
      notificationType: type,
      title: titleNotification,
      text: text,
      class: 'notification',
      timeout: timeout,
    } as TNotification;
    super('div', newProps);

    this.show();
  }

  addEvents() {
    this._element?.querySelector('.btn-close')?.addEventListener('click', () => this.hide());

    setTimeout(() => {
      this.hide();
    }, this.props.timeout);
  }

  show() {
    document.getElementById('notification-stack')?.append(this.getContent()!);
  }

  hide() {
    this.destroy();
  }

  render(): Node {
    return this.compile(tpl) as Node;
  }
}
