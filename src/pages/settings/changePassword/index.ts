import Block from '../../../services/block';
import FormChangePassword from '../../../forms/changePassword';
import LayoutMain from '../../../layouts/main';
import { tpl } from './tpl.hbs';

const content = new FormChangePassword({});
const layout = new LayoutMain({
  layoutContent: content,
});

export default class ChangePassword extends Block<{}> {
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
