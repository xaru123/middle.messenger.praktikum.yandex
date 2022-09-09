import Block from '../../../services/block';
import FormChangeProfile from '../../../forms/changeProfile';
import LayoutMain from '../../../layouts/main';
import { tpl } from './tpl.hbs';

export default class ChangeProfile extends Block<{}> {
  constructor() {
    const content = new FormChangeProfile({});
    const layout = new LayoutMain({
      layoutContent: content,
    });

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
