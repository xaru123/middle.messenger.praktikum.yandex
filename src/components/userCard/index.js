import Handlebars from 'handlebars';
import tpl from './tpl.hbs';
import './style.scss';
import avatar from '../avatar';
import link from '../link';
import modal from '../modal';
import modalChangeImg from '../modalChangeImg';

let data = {
  'order': [
    {'field': 'mail', 'name': 'Почта'},
    {'field': 'login', 'name': 'Логин'},
    {'field': 'name', 'name': 'Имя'},
    {'field': 'surname', 'name': 'Фамилия'},
    {'field': 'nickname', 'name': 'Имя в чате'},
    {'field': 'tel', 'name': 'Телефон'},
  ],
  'headerTitle': 'Профиль',
  'userInfo': {
    'mail': 'pochta@yandex.ru',
    'login': 'ivanivanov',
    'name': 'Иван',
    'surname': 'Иванов',
    'nickname': 'Иван',
    'tel': '+7 (909) 967 30 30',
    'avatar': './static/avatar.png',
  },
  listA: [
    {text: 'Изменить данные', href: './change-profile'},
    {text: 'Изменить пароль', href: './change-password'},
  ],
};

document.addEventListener('DOMContentLoaded', function(event) {
  let htmlTpl = document.createElement('template');

  let avatarProf = document.getElementById('root').
      querySelectorAll('.profile__avatar');
  if (avatarProf.length == 0) {
    return [];
  }
  avatarProf = avatarProf[0];

  avatarProf.addEventListener('click', (e) => {
    let func = modal('Загрузите файл', modalChangeImg());
    htmlTpl.innerHTML = func;
    document.getElementById('root').appendChild(htmlTpl.content);
  });

});

Handlebars.registerPartial('user-card', tpl);

export default () => {
  return tpl(data);
}
