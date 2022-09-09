import Block from '../../../services/block';
import LayoutMain from '../../../layouts/main';
import UserCard from '../../../components/userCard';
import { tpl } from './tpl.hbs';

export default class Profile extends Block<{}> {
  constructor() {
    const content = new UserCard();
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
