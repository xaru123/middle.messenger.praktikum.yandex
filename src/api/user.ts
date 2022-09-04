import { BaseAPI } from './base';

export interface IApiSearch extends FormData {
  login: string;
}

export interface IApiAvatar extends FormData {
  avatar: string;
}

export interface IApiPassword extends FormData {
  oldPassword: string;
  newPassword: string;
}

export interface IApiUser extends FormData {
  id?: number;
  firstName: string;
  secondName: string;
  displayName: string;
  login: string;
  email: string;
  phone: string;
}

export class UserAPI extends BaseAPI {
  constructor() {
    super('/user');
  }

  changeProfile(data: IApiUser) {
    return this.put('/profile', {
      withCredentials: true,
      data: JSON.stringify(data),
    });
  }

  changeAvatar(data: IApiAvatar) {
    return this.put('/profile/avatar', {
      withCredentials: true,
      data: data,
      headers: {},
    });
  }

  changePassword(data: IApiPassword) {
    return this.put('/password', {
      withCredentials: true,
      data: JSON.stringify(data),
    });
  }

  getUserById(userId: number) {
    return this.get(`/${userId}`, {
      withCredentials: true,
    });
  }

  searchForUserByLogin(data: IApiSearch) {
    console.log(data);
    return this.post('/search', {
      withCredentials: true,
      data: JSON.stringify(data),
    });
  }
}
