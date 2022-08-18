import { tpl } from './tpl.hbs';
import Block from '../../services/block';
import './style.scss';

export default class Icon extends Block {
  constructor(props) {
    const newProps = {
      class: `${props.class ? props.class : ''} material-icons md-36 icon`,
      ...props,
    };
    super('i', newProps);
  }

  render(): Node {
    return this.compile(tpl) as Node;
  }
}
