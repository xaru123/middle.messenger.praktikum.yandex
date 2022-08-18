import { tpl } from './tpl.hbs';
import Block from '../../services/block';
import './style.scss';

export default class DialogItem extends Block {
  constructor(props) {
    const newProps = {
      class: 'dialog-item',
      ...props,
    };
    super('i', newProps);
  }

  render(): Node {
    return this.compile(tpl) as Node;
  }
}
