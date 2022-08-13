import { tpl } from './tpl.hbs';
import Block from '../../services/block';
import './style.scss';

export default class Avatar extends Block {
  constructor(props) {
    const newProps = {
      ...props,
      class: `${props.class ? props.class : ''} avatar`,
    };
    super('img', newProps);
  }

  render(): Node {
    return this.compile(tpl) as Node;
  }
}
