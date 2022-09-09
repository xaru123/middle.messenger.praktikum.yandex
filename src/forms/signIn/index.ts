import Block from '../../services/block';
import Button from '../../components/button';
import Input from '../../components/input';
import { AuthController } from '../../controllers/auth';
import { Form, FormDataFormatterInterface } from '../../components/form';
import { IApiSignIn } from '../../api/auth';
import { tpl } from './tpl.hbs';
import './style.scss';

export default class FormSignIn extends Block<{}> {
  constructor() {
    const btnSubmit = new Button({
      type: 'submit',
      class: 'button form__button',
      disabled: 'disabled',
      value: 'Авторизоваться',
    });
    const inputLogin = new Input({
      type: 'text',
      id: 'login',
      label: 'Логин',
      class: 'input-group',
    });
    const inputPassword = new Input({
      type: 'password',
      id: 'password',
      label: 'Пароль',
      class: 'input-group',
    });
    const formContent = new Form({
      id: 'form-sign-in',
      action: '/',
      method: 'post',
      class: 'form flex__item',
      listBlockInputs: [inputLogin, inputPassword],
      listBlockBtn: [btnSubmit],
      submitCallback: (formData: FormDataFormatterInterface): Promise<string> => {
        return new Promise((resolve, reject) => {
          new AuthController()
            .signIn({
              login: formData.login,
              password: formData.password,
            } as IApiSignIn)
            .then(() => resolve('ok'))
            .catch((error) => reject(error));
        });
      },
    });

    super('div', {
      formContent,
    });
  }

  render(): Node {
    return this.compile(tpl) as Node;
  }
}
