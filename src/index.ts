import { renderDOM } from './utils/renderDOM';
import Block from './services/block';
import './style/styles.scss';

import SignIn from './pages/auth/signIn';
import SignUp from './pages/auth/signUp';
import Error400 from './pages/server/400';
import Error500 from './pages/server/500';
import Profile from './pages/settings/profile';
import ChangeProfile from './pages/settings/changeProfile';
import ChangePassword from './pages/settings/changePassword';
import Chats from './pages/chats/chats';

const location: string = document.location.pathname;
let page: Block | null = null;

switch (location) {
  case '/':
  case '/auth':
  case '/auth/sign-in':
    page = new SignIn();
    break;
  case '/auth/sign-up':
    page = new SignUp();
    break;
  case '/chats':
    page = new Chats();
    break;
  case '/settings/profile':
    page = new Profile();
    break;
  case '/settings/change-profile':
    page = new ChangeProfile();
    break;
  case '/settings/change-password':
    page = new ChangePassword();
    break;
  case '/500':
    page = new Error500();
    break;
  default:
    page = new Error400();
    break;
}
renderDOM('#root', page);
