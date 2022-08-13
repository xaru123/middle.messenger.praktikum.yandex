import { tpl } from './tpl.hbs';
import Block from '../../../services/block';
import LayoutMain from '../../../layouts/main';
import FormChangePassword from '../../../forms/changePassword';

const content = new FormChangePassword({});
const layout = new LayoutMain({
  layoutContent: content,
});

export default class changePassword extends Block {
  constructor() {
    const newProps = {
      layout,
      class: 'content',
    };
    super('div', newProps);
  }

  render(): Node {
    return this.compile(tpl) as Node;
  }
}
