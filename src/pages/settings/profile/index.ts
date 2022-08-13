import { tpl } from './tpl.hbs';
import Block from '../../../services/block';
import LayoutMain from '../../../layouts/main';
import UserCard from '../../../components/userCard';

const content = new UserCard({});
const layout = new LayoutMain({
  layoutContent: content,
});

export default class SignIn extends Block {
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
