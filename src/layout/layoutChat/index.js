import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import './style.scss';
import dialogList from '../../components/dialogList';
import chat from '../../components/chat';

Handlebars.registerPartial('layout-chat', tpl);

export default (contentMainLayout) => {
  return tpl({});
}

