import { BaseAPI } from './base';

export interface IApiSignUp {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  phone: string;
  password: string;
}

export interface IApiSignIn {
  login: string;
  password: string;
}

export class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth');
  }

  signUp(data: IApiSignUp) {
    return this.post('/signup', {
      withCredentials: true,
      data: JSON.stringify(data),
    });
  }

  signIn(data: IApiSignIn) {
    return this.post('/signin', {
      withCredentials: true,
      data: JSON.stringify(data),
    });
  }

  signOut() {
    return this.post('/logout', {
      withCredentials: true,
    });
  }

  checkUser() {
    return this.get('/user', {
      withCredentials: true,
    });
  }
}
