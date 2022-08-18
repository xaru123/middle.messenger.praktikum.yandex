import Block from '../../services/block';
import { tpl } from './tpl.hbs';
import './style.scss';

interface ButtonProps {
  type: string;
  class: string;
  value: string;
  onClick?: Function;
  id?: string;
  title?: string;
  tabindex?: number;
  disabled?: string;
}

export default class Button extends Block {
  constructor(props: ButtonProps) {
    super('button', props);
  }

  render(): Node {
    return this.compile(tpl) as Node;
  }
}
