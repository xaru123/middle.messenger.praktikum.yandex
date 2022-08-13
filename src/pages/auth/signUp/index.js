import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import authLayout from '../../../layout/authLayout';
import formSignUp from '../../../components/formSignUp';

let data = {
  headerTitle: 'Регистрация',
  aUrl: {
    title: 'Войти?',
    href: '/auth/sign-in',
  },
  formContent: formSignUp,
};
Handlebars.registerPartial('sign-up', tpl);

export default (props = {}) => {
  return tpl(data);
}
