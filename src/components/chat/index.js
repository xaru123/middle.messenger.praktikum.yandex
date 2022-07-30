import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import './style.scss';
import icon from '../icon';
import modal from '../modal';
import modalAddUser from '../modalAddUser';
import modalDelUser from '../modalDelUser';

let data = {
  msgList: [
    {
      type: 'from',
      text: 'ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd' +
          'ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd',
      time: '12:20',
    },
    {type: 'from', text: 'dddddddddd', time: '12:20'},
    {type: 'to', text: 'eeee', time: 'ПН, 12:20'},
    {type: 'from', text: 'dddddddddddddddddddd', time: '12:20'},
    {type: 'to', text: 'e', time: '12:20'},
    {type: 'to', text: 'eeee', time: '12:20'},
    {type: 'to', text: 'eeee', time: '12:20'},
    {type: 'to', text: 'eeee', time: '12:20'},
    {type: 'to', text: 'eeee', time: '12:20'},
    {type: 'to', text: 'eeee', time: '12:20'},
    {type: 'to', text: 'eeee', time: '12:20'},
    {type: 'to', text: 'eeee', time: '12:20'},
    {type: 'to', text: 'eeee', time: '12:20'},
    {type: 'to', text: 'eeee', time: '12:20'},
    {type: 'to', text: 'eeee', time: '12:20'},
    {type: 'to', text: 'eeee', time: '12:20'},
    {type: 'to', text: 'eeee', time: '12:20'},
  ],
};

document.addEventListener('DOMContentLoaded', function(event) {
  let htmlTpl = document.createElement('template');

  let settingChat = document.getElementById('root').
      querySelectorAll('.dropdown-btn');
  if (settingChat.length == 0) {
    return [];
  }
  settingChat = settingChat[0];
  let dropdown = document.getElementById('root').
      querySelectorAll('.dropdown-content')[0];
  let modals = document.getElementById('root').
      querySelectorAll('.modal')[0];

  settingChat.addEventListener('click', (e) => {
    dropdown.classList.add('clicked');
  });

  document.getElementById('li-add-user').addEventListener('click', (e) => {
    let func = modal('Добавить пользователя', modalAddUser());
    htmlTpl.innerHTML = func;
    document.getElementById('root').appendChild(htmlTpl.content);
  });
  document.getElementById('li-del-user').addEventListener('click', (e) => {
    let func = modal('Удалить пользователя', modalDelUser());
    htmlTpl.innerHTML = func;
    document.getElementById('root').appendChild(htmlTpl.content);
  });
});

Handlebars.registerPartial('chat', tpl(data));

export default () => {
  return tpl();
}
