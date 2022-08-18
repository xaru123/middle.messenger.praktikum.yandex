import { tpl } from './tpl.hbs';
import Block from '../../services/block';
import './style.scss';

export default class LayoutServerError extends Block {
  constructor(props: object) {
    const newProps = {
      lass: 'server-error',
      ...props,
    };
    super('div', newProps);
  }

  render(): Node {
    return this.compile(tpl) as Node;
  }
}
