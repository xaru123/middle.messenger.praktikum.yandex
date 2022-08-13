import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import './style.scss';
import searchBlock from '../searchBlock';
import dialogItem from '../dialogItem';

let data = {
  listR: [
    {name: 'Андрей', text: 'Изображения', time: '10:49', isLastFromThat: false},
    {name: 'Киноклуб', text: 'Стикер', time: '10:49', isLastFromThat: true},
    {
      name: 'Игорь',
      text: 'Друзья, у меня для вас особененное ооооооооооооооочень длинное сообщение',
      time: 'ПН',
      isLastFromThat: true,
    },
  ],
};

Handlebars.registerPartial('dialog-list', tpl(data));

document.addEventListener('DOMContentLoaded', function(event) {
  let dialogList = document.getElementById('root').
      querySelectorAll('.dialog-list');

  if (dialogList.length == 0) {
    return [];
  }
  let dialogsRows = dialogList[0].
      querySelectorAll('.dialog-list__row');

  dialogsRows.forEach(function(row) {
    row.addEventListener('click', (e) => {
      dialogsRows.forEach(function(row2) {
        row2.classList.remove('selected');
      });

      row.classList.add('selected');
      let chatBlock = document.getElementById('root').
          querySelectorAll('.chat-block')[0];
      chatBlock.classList.add('show');
    });
  });

  dialogList[0].addEventListener('click', (e) => {
    if (!e.target.classList.contains('dialog-list')) {
      return [];
    }
    dialogsRows.forEach(function(row2) {
      row2.classList.remove('selected');
    });

    let chatBlock = document.getElementById('root').
        querySelectorAll('.chat-block')[0];
    chatBlock.classList.remove('show');
  });
});

export default (props) => {
  return tpl(props);
}
