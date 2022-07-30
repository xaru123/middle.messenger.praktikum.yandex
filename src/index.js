import tpl from './index.hbs';
import './styles.scss';
import signIn from './pages/auth/signIn';
import signUp from './pages/auth/signUp';
import chats from './pages/chats/chats';
import profile from './pages/settings/profile';
import changeProfile from './pages/settings/changeProfile';
import changePassword from './pages/settings/changePassword';
import error400 from './pages/server/400';
import error500 from './pages/server/500';

let location = document.location.pathname;
let template = '';
let contentClass = '';

switch (location) {
  case '/':
  case '/auth':
  case '/auth/sign-in':
    contentClass = 'body__background-img body__background-img_direction-bottom content_position-center';
    template = signIn;
    break;
  case '/auth/sign-up':
    contentClass = 'body__background-img body__background-img_direction-bottom content_position-center';
    template = signUp;
    break;
  case '/chats':
    template = chats;
    break;
  case '/settings/profile':
    template = profile;
    break;
  case '/settings/change-profile':
    template = changeProfile;
    break;
  case '/settings/change-password':
    template = changePassword;
    break;
  case '/500':
    contentClass = 'body__background-img body__background-img_direction-center-left';
    template = error500;
    break;
  default:
    contentClass = 'body__background-img body__background-img_direction-center-left';
    template = error400;
    break;

}

document.getElementById('root').innerHTML = tpl({
  contentClass: contentClass,
  contentBody: template,
});

document.getElementById('root').addEventListener('click', (e) => {
  if (!e.target.classList.contains('dropdown-btn')) {
    let dropdown = document.getElementById('root').
        querySelectorAll('.dropdown-content');
    if (dropdown.length != 0) {
      dropdown [0].classList.remove('clicked');
    }
  }
});