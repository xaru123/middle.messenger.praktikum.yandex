import Block from '../../services/block';
import Button from '../../components/button';
import Input from '../../components/input';
import { Form } from '../../components/form';
import { IApiPassword } from '../../api/user';
import { UserController } from '../../controllers/user';
import { router } from '../../router';
import { tpl } from './tpl.hbs';

export default class FormChangePassword extends Block<{}> {
  constructor(props) {
    const btnSubmit = new Button({
      type: 'submit',
      class: 'button form__button',
      value: 'Сохранить',
      title: 'Сохранить',
    });
    const btnBack = new Button({
      type: 'button',
      class: 'button form__button button_small',
      value: 'Назад',
      title: 'Назад',
      onClick: (e) => {
        e.preventDefault();

        router.back();
      },
    });
    const inputPassword = new Input({
      type: 'password',
      id: 'password',
      name: 'password',
      label: 'Пароль',
      class: 'input-group form__input',
    });

    const inputPasswordOld = new Input({
      type: 'password',
      id: 'oldPassword',
      name: 'oldPassword',
      label: 'Новый пароль',
      class: 'input-group form__input',
    });
    const inputPasswordNew = new Input({
      type: 'password',
      id: 'newPassword',
      name: 'newPassword',
      label: 'Новый пароль (еще раз)',
      class: 'input-group form__input',
    });

    const formContent = new Form({
      id: 'test',
      class: 'form flex__item',
      listBlockInputs: [inputPassword, inputPasswordOld, inputPasswordNew],
      listBlockBtn: [btnBack, btnSubmit],
      submitCallback: (formData): Promise<string> => {
        return new Promise((resolve) => {
          const userC = new UserController();
          userC
            .changePassword({
              oldPassword: formData.password,
              newPassword: formData.newPassword,
            } as IApiPassword)
            .then(() => {
              resolve('OK');
            });
        });
      },
    });

    const newProps = {
      formContent,
      class: 'content-form content-form-profile',
      headerTitle: 'Изменить пароль',
      ...props,
    };
    super('div', newProps);
  }

  render(): Node {
    return this.compile(tpl) as Node;
  }
}
