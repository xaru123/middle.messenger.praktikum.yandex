import Block from '../../services/block';
import Router from '../../services/Router';
import { tpl } from './tpl.hbs';
import './style.scss';

export interface Ilink {
  id?: string;
  href: string;
  title?: string;
  class: string;
  value: string | Block<{}>;
  target?: string;
  onClick?: (e) => void;
}

export default class Link extends Block<Ilink> {
  constructor(props: Ilink) {
    if (!props.onClick) {
      props.onClick = (e) => {
        let target = e.target;

        if (target.nodeName == 'I') {
          target = target.parentNode;
        }
        if (target && target.getAttribute('href')) {
          new Router().go(target.getAttribute('href'));
          e.preventDefault();
          e.stopPropagation();
        }
      };
    }

    super('a', props);
  }

  render(): Node {
    return this.compile(tpl) as Node;
  }
}
