import { tpl } from './tpl.hbs';
import Block from '../../services/block';
import './style.scss';

interface LinkProps {
  id?: string;
  href: string;
  title?: string;
  class: string;
  value: string | Block;
  target: string;
}

export default class Link extends Block {
  constructor(props: LinkProps) {
    super('a', props);
  }

  render(): Node {
    return this.compile(tpl) as Node;
  }
}
