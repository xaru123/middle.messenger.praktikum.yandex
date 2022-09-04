import Block from '../../services/block';
import { tpl } from './tpl.hbs';
import './style.scss';

export default class Loader extends Block<{}> {
  constructor() {
    const newProps = {
      class: 'loader',
    };
    super('div', newProps);
    document.body.append(this.getContent()!);
  }

  render(): Node {
    return this.compile(tpl) as Node;
  }
}
