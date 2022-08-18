import { tpl } from './tpl.hbs';
import Block from '../../services/block';
import './style.scss';

export default class LayoutAuth extends Block {
  constructor(props: object) {
    const newProps = {
      ...props,
      class: 'layout-auth__content logic-block',
    };
    super('div', newProps);
  }

  render(): Node {
    return this.compile(tpl) as Node;
  }
}
