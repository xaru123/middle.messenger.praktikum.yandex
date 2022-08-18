import { tpl } from './tpl.hbs';
import Block from '../../../services/block';
import LayoutMain from '../../../layouts/main';
import FormChangeProfile from '../../../forms/changeProfile';

const content = new FormChangeProfile({});
const layout = new LayoutMain({
  layoutContent: content,
});

export default class ChangeProfile extends Block {
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
