import Block from '../../services/block';
import Button from '../../components/button';
import Input from '../../components/input';
import { Form, FormDataFormatterInterface } from '../../components/form';
import { IApiAvatar } from '../../api/user';
import { UserController } from '../../controllers/user';
import { tpl } from './tpl.hbs';
import './style.scss';

export class FormChangeAvatar extends Block<{}> {
  constructor() {
    const inputFile = new Input({
      type: 'file',
      label: '',
      id: 'avatar',
      name: 'avatar',
    });
    const btnSubmit = new Button({
      type: 'submit',
      class: 'button form__button',
      value: 'Поменять',
    });

    const formContent = new Form({
      id: 'form-change-avatar',
      action: '/',
      method: 'post',
      class: 'form flex__item',
      listBlockInputs: [inputFile],
      listBlockBtn: [btnSubmit],
      submitCallback: (formData: FormDataFormatterInterface<IApiAvatar>) => {
        const userC = new UserController();
        const formFile = new FormData();
        formFile.append('avatar', formData.avatar as string);
        userC.changeAvatar(formFile as IApiAvatar);
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
