import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import './style.scss';
import menu from '../../components/menu';

Handlebars.registerPartial('main-layout', tpl);

export default (contentMainLayout) => {
  return tpl({
    contentMainLayout: contentMainLayout,
  });
}

