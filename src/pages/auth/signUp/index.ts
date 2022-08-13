import { tpl } from './tpl.hbs';
import Block from '../../../services/block';
import LayoutAuth from '../../../layouts/auth';
import FormSignUp from '../../../forms/signUp';
import Link from '../../../components/link';

const formContent = new FormSignUp();
const link = new Link({
  id: 'link',
  href: '/auth/sign-in',
  class: 'link',
  value: 'Войти?',
  target: '_self',
});
const layout = new LayoutAuth({
  headerTitle: 'Регистрация',
  formContent: formContent,
  link: link,
});

export default class SignUp extends Block {
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
