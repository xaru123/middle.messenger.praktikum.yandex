import Block from '../../services/block';
import { tpl } from './tpl.hbs';
import './style.scss';

export interface IButton {
  type: string;
  class: string;
  value: string | Block<{}>;
  onClick?: Function;
  id?: string;
  title?: string;
  tabindex?: number;
  disabled?: string;
}

export default class Button extends Block<IButton> {
  constructor(props: IButton) {
    super('button', props);
  }

  render(): Node {
    return this.compile(tpl) as Node;
  }
}
