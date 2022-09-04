import Block from '../../services/block';
import Menu from '../../components/menu';
import { tpl } from './tpl.hbs';
import './style.scss';

export default class LayoutMain extends Block<{}> {
  constructor(props: object) {
    const newProps = {
      menu: new Menu(),
      ...props,
    };
    super('div', {
      ...newProps,
      class: 'layout-main',
    });
  }

  render(): Node {
    return this.compile(tpl) as Node;
  }
}
