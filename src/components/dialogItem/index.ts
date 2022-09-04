import Block from '../../services/block';
import { tpl } from './tpl.hbs';
import './style.scss';

export interface IDialogItem {
  class?: string;
  id?: string;
}

export default class DialogItem extends Block<IDialogItem> {
  constructor(props: IDialogItem) {
    const newProps = {
      class: 'dialog-item',
      ...props,
    } as IDialogItem;
    super('i', newProps);
  }

  protected componentDidMount() {}

  render(): Node {
    return this.compile(tpl) as Node;
  }
}
