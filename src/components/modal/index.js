import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import './style.scss';
import modal from '../modal';
import modalAddUser from '../modalAddUser';
import stringifyFunc from '../../utils/stringifyFunc';

let modalClose = function(event) {
  let modals = document.getElementById('root').
      querySelectorAll('.modal');
  if (modals.length > 0) {
    modals[0].remove();
  }
};

Handlebars.registerPartial('modal', tpl({modalClose}));

export default (headerTitle = '', content) => {
  return tpl({headerTitle, content, modalClose});
}
