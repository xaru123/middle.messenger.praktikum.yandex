import Block from '../../services/block';
import Button from '../../components/button';
import SearchBlock from '../../components/searchBlock';
import { ChatsController } from '../../controllers/chats';
import { Form, FormDataFormatterInterface } from '../../components/form';
import { IApiChatWithUser } from '../../api/chat';
import { Notification } from '../../components/notification';
import { tpl } from './tpl.hbs';
import './style.scss';

export class FormAddUser extends Block<{}> {
  constructor() {
    const chatC = new ChatsController();
    const search = new SearchBlock({
      needList: true,
      required: true,
    });
    const btnSubmit = new Button({
      type: 'submit',
      class: 'button form__button',
      value: 'Добавить',
      disabled: 'disabled',
    });

    const formContent1 = new Form({
      id: 'form-add-user',
      action: '/',
      method: 'post',
      class: 'form flex__item',
      listBlockInputs: [search],
      listBlockBtn: [btnSubmit],
      submitCallback: (formData: FormDataFormatterInterface, contextForm: Block<{}>, e: Event): Promise<string> => {
        return new Promise((resolve, reject) => {
          const listInputChecked = contextForm?._element?.querySelectorAll(':checked') as NodeListOf<HTMLInputElement>;
          if (listInputChecked && !listInputChecked.length) {
            new Notification('danger', 'Не выбраны пользователи');
            e.preventDefault();
            e.stopPropagation();
            return reject(new Error());
          }
          chatC
            .addUsersToChat({
              users: formData.users as string[],
              chatId: +localStorage?.getItem('lastOpenedChat')!,
            } as IApiChatWithUser)
            .finally(() => {
              resolve('OK');
            });
        });
      },
    });
    super('div', {
      formContent1,
    });
  }

  render(): Node {
    return this.compile(tpl) as Node;
  }
}
