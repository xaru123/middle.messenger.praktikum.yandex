import Router from './services/Router';

import SignIn from './pages/auth/signIn';
import SignUp from './pages/auth/signUp';
import Error400 from './pages/server/400';
import Error500 from './pages/server/500';
import Profile from './pages/settings/profile';
import ChangeProfile from './pages/settings/changeProfile';
import ChangePassword from './pages/settings/changePassword';
import Chats from './pages/chats/chats';

import './style/styles.scss';

const router = new Router('#root');

router.
    use('/', new SignIn(), 'div', {}).
    use('/sign-up', new SignUp(), 'div', {}).
    use('/settings', new Profile(), 'div', {}, true).
    use('/settings/change/info', new ChangeProfile(), 'div', {}, true).
    use('/settings/change/password', new ChangePassword(), 'div', {}, true).
    use('/messenger', new Chats(), 'div', {}, true).
    use('/404', new Error400(), 'div', {}, true).
    use('/500', new Error500(), 'div', {}, true).
    start();
