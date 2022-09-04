import Block from '../../../services/block';
import FormSignIn from '../../../forms/signIn';
import LayoutAuth from '../../../layouts/auth';
import Link from '../../../components/link';
import { tpl } from './tpl.hbs';

const link = new Link({
  id: 'link',
  href: '/sign-up',
  class: 'link',
  value: 'Нет аккаунта?',
  target: '_self',
});

const layout = new LayoutAuth({
  headerTitle: 'Вход',
  formContent: new FormSignIn(),
  link: link,
});

export default class SignIn extends Block<{}> {
  constructor() {
    const newProps = {
      layout,
      class: 'layout-auth',
    };
    super('div', newProps);
  }

  render(): Node {
    return this.compile(tpl) as Node;
  }
}
