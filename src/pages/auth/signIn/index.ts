import { tpl } from './tpl.hbs';
import Block from '../../../services/block';
import LayoutAuth from '../../../layouts/auth';
import FormSignIn from '../../../forms/signIn';
import Link from '../../../components/link';

const formContent = new FormSignIn();
const link = new Link({
  id: 'link',
  href: '/auth/sign-up',
  class: 'link',
  value: 'Нет аккаунта?',
  target: '_self',
});
const layout = new LayoutAuth({
  headerTitle: 'Вход',
  formContent: formContent,
  link: link,
});

export default class SignIn extends Block {
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
