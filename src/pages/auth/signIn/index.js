import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import authLayout from '../../../layout/authLayout';
import formSignIn from '../../../components/formSignIn';

let data = {
  headerTitle: 'Вход',
  aUrl: {
    title: 'Нет аккаунта?',
    href: '/auth/sign-up',
  },
  formContent: formSignIn,
};

Handlebars.registerPartial('sign-in', tpl);

export default (props = {}) => {
  return tpl(data);
}