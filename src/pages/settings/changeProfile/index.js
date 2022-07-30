import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import mainLayOut from '../../../layout/main';
import formChangeProfile from '../../../components/formChangeProfile';

Handlebars.registerPartial('settings-change-profile', tpl);

export default (props = {}) => {
  return tpl({
    content: formChangeProfile,
  });
}
