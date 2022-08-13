import { tpl } from './tpl.hbs';
import Block from '../../services/block';
import './style.scss';
import Menu from '../../components/menu';

const menu = new Menu();

export default class LayoutMain extends Block {
  constructor(props: object) {
    const newProps = {
      menu: menu,
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
