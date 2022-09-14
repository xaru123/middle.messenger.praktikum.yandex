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
  .use('/', new SignIn(), { needAuth: false })
  .use('/sign-up', new SignUp(), { needAuth: false })
  .use('/messenger', new Chats(), { needAuth: true })
  .use('/settings', new Profile(), { needAuth: true })
  .use('/settings/change/info', new ChangeProfile(), { needAuth: true })
  .use('/settings/change/password', new ChangePassword(), { needAuth: true })
  .use('/404', new Error400(), { needAuth: false })
  .use('/500', new Error500(), { needAuth: false })
  .start();
