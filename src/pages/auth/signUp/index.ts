import Block from '../../../services/block';
import FormSignUp from '../../../forms/signUp';
import LayoutAuth from '../../../layouts/auth';
import Link from '../../../components/link';
import { tpl } from './tpl.hbs';

const formContent = new FormSignUp();
const link = new Link({
  id: 'link',
  href: '/',
  class: 'link',
  value: 'Войти?',
});
const layout = new LayoutAuth({
  headerTitle: 'Регистрация',
  formContent: formContent,
  link: link,
});

export default class SignUp extends Block<{}> {
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
