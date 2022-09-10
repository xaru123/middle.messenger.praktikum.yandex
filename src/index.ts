import { router } from './router';

import ChangePassword from './pages/settings/changePassword';
import ChangeProfile from './pages/settings/changeProfile';
import Chats from './pages/chats/chats';
import Error400 from './pages/server/400';
import Error500 from './pages/server/500';
import Profile from './pages/settings/profile';
import SignIn from './pages/auth/signIn';
import SignUp from './pages/auth/signUp';
import { AuthController } from './controllers/auth';

import './style/styles.scss';

router

      .addFunctionForAuthCheck(new AuthController().checkUser)
  .use('/', new SignIn(), 'div', {}, false)
  .use('/sign-up', new SignUp(), 'div', {}, false)
  .use('/messenger', new Chats(), 'div', {}, true)
  .use('/settings', new Profile(), 'div', {}, true)
  .use('/settings/change/info', new ChangeProfile(), 'div', {}, true)
  .use('/settings/change/password', new ChangePassword(), 'div', {}, true)
  .use('/404', new Error400(), 'div', {}, false)
  .use('/500', new Error500(), 'div', {}, false)
  .start();
