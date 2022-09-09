import { IApiAvatar, IApiPassword, IApiSearch, IApiUser, UserAPI } from '../api/user';
import { Notification } from '../components/notification';
import { handlerError } from '../utils/handlerError';
import { router } from '../router';
import { store } from '../store';

const user = new UserAPI();

export class UserController {
  public changeProfile(userData: IApiUser) {
    return user
      .changeProfile(userData)
      .then((userInfo) => {
        new Notification('success', 'Данные профиля изменены');

        store.setState({ userInfo });
        router.go('/settings');
      })
      .catch(handlerError);
  }

  public changeAvatar(userData: IApiAvatar) {
    return user
      .changeAvatar(userData)
      .then((userInfo) => {
        new Notification('success', 'Новый аватар загружен');

        store.setState({ userInfo });
        router.go('/settings');
      })
      .catch(handlerError);
  }

  public changePassword(userData: IApiPassword) {
    return user
      .changePassword(userData)
      .then(() => {
        new Notification('success', 'Пароль изменен');
        router.go('/settings');
      })
      .catch((error) => handlerError(error));
  }

  public getUserById(userId: number) {
    return user
      .getUserById(userId)
      .then((userInfo) => {
        store.setState({ userInfo });
        return userInfo;
      })
      .catch(handlerError);
  }

  public searchForUserByLogin(userData: IApiSearch) {
    return user
      .searchForUserByLogin(userData)
      .then((listUser) => {
        return listUser;
      })
      .catch(handlerError);
  }
}
