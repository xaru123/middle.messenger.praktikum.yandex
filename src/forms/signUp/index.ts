import Block from '../../services/block';
import Button from '../../components/button';
import Input from '../../components/input';
import { AuthController } from '../../controllers/auth';
import { Form, FormDataFormatterInterface } from '../../components/form';
import { IApiSignUp } from '../../api/auth';
import { tpl } from './tpl.hbs';
import './style.scss';

export default class FormSignIn extends Block<{}> {
  constructor() {
    const btnSubmit = new Button({
      type: 'submit',
      class: 'button form__button',
      disabled: 'disabled',
      value: 'Зарегистрироваться',
    });
    const inputMail = new Input({
      type: 'text',
      id: 'email',
      label: 'Почта',
      class: 'input-group',
    });
    const inputLogin = new Input({
      type: 'text',
      id: 'login',
      label: 'Логин',
      class: 'input-group',
    });
    const inputName = new Input({
      type: 'text',
      id: 'first_name',
      label: 'Имя',
      class: 'input-group',
    });
    const inputName2 = new Input({
      type: 'text',
      id: 'second_name',
      label: 'Фамилия',
      class: 'input-group',
    });
    const inputPhone = new Input({
      type: 'tel',
      id: 'phone',
      label: 'Телефон',
      class: 'input-group',
    });
    const inputPass = new Input({
      type: 'password',
      id: 'oldPassword',
      label: 'Пароль',
      class: 'input-group',
    });
    const inputPassNew = new Input({
      type: 'password',
      id: 'newPassword',
      label: 'Пароль (еще раз)',
      class: 'input-group',
    });
    const formContent = new Form({
      id: 'form-sign-up',
      action: '/',
      method: 'post',
      class: 'form flex__item',
      listBlockInputs: [inputMail, inputLogin, inputName, inputName2, inputPhone, inputPass, inputPassNew],
      listBlockBtn: [btnSubmit],
      submitCallback: (formData: FormDataFormatterInterface): Promise<string> => {
        return new Promise((resolve, reject) => {
          const data = {
            email: formData.email,
            login: formData.login,
            first_name: formData.first_name,
            second_name: formData.second_name,
            phone: formData.phone,
            password: formData.oldPassword,
          } as IApiSignUp;
          new AuthController()
            .signUp(data)
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
