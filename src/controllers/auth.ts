import { AuthAPI, IApiSignIn, IApiSignUp } from '../api/auth';
import { Notification } from '../components/notification';
import { handlerError } from '../utils/handlerError';
import { loader } from '../loader';
import { router } from '../router';
import { store } from '../store';

const auth = new AuthAPI();

export class AuthController {
  public signUp(userData: IApiSignUp) {
    loader.show();
    return auth
      .signUp(userData)
      .then(() => {
        new Notification('success', 'Регистрация прошла успешно');
        router.go('/');
      })
      .catch(handlerError)
      .finally(() => loader.hide());
  }

  public signIn(userData: IApiSignIn) {
    loader.show();
    return auth
      .signIn(userData)
      .then(() => {
        this.checkUser().then(() => {
          new Notification('info', 'Добро пожаловать в чат');

          router.go('/messenger');
        });
      })
      .catch((error) => handlerError(error))
      .finally(() => loader.hide());
  }

  public signOut() {
    loader.show();
    return auth
      .signOut()
      .then(() => {
        new Notification('info', 'Пока, надеюсь, скоро увидимся');
        store.destroy();
        localStorage.removeItem('lastOpenedChat');
        router.go('/');
      })
      .catch((error) => handlerError(error))
      .finally(() => loader.hide());
  }

  public checkUser() {
    loader.show();
    return auth
      .checkUser()
      .then((responce) => {
        store.setState({ userInfo: responce });
      })
      .catch((error) => {
        handlerError(error);
        store.setState({ userInfo: {} });
        router.go('/');
      })
      .finally(() => loader.hide());
  }
}
