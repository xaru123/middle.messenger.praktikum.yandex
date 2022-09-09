import Block from '../../services/block';
import { tpl } from './tpl.hbs';
import './style.scss';

export type TIcon = {
  id?: string;
  value: string;
  class?: string;
  onClick?: () => void;
};

export default class Icon extends Block<TIcon> {
  constructor(props: TIcon) {
    const newProps = {
      class: `${props.class ? props.class : ''} material-icons icon`,
      ...props,
    } as TIcon;
    super('i', newProps);
  }

  render(): Node {
    return this.compile(tpl) as Node;
  }
}
