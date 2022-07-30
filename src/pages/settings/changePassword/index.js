import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import mainLayOut from '../../../layout/main';
import formChangePassword from '../../../components/formChangePassword';

Handlebars.registerPartial('settings-change-password', tpl);

export default (props = {}) => {
  return tpl({
    content: formChangePassword,
  });
}
