import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import mainLayOut from '../../../layout/main';
import userCard from '../../../components/userCard';

Handlebars.registerPartial('settings-profile', tpl);

export default (props = {}) => {
  return tpl({
    content: userCard,
  });
}
