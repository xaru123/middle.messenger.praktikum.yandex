import { tpl } from './tpl.hbs';
import Block from '../../services/block';
import './style.scss';
import Icon from '../icon';
import Input from '../input';

const icon = new Icon({
  value: 'search',
  class: 'material-icons md-36 icon search__icon',
});
const input = new Input({
  type: 'text',
  id: 'search',
  class: 'search__input',
  label: '',
});

export default class SearchBlock extends Block {
  constructor() {
    super('div', {
      class: 'search',
      icon,
      input,
    });
  }

  render(): Node {
    return this.compile(tpl) as Node;
  }
}
