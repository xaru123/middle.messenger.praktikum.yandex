import Block from '../../services/block';
import { tpl } from './tpl.hbs';
import './style.scss';

export type TIcon = {
  value: string;
  id?: string;
  class?: string;
  onClick?: (e?: Event) => void;
};

export default class Icon extends Block<TIcon> {
  constructor(props: TIcon) {
    const newProps = {
      class: `${props.class ? props.class : ''} material-icons icon`,
      ...props,
    };
    super('i', newProps);
  }

  render(): Node {
    return this.compile(tpl) as Node;
  }
}
