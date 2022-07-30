import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import input from '../../components/input';
import button from '../../components/input';

Handlebars.registerPartial('modal-del-user', tpl);

export default (props) => {
  return tpl(props);
}
