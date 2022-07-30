import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import link from '../../components/link';

Handlebars.registerPartial('auth-layout', tpl);

export default (props) => {
  return tpl(props);
}