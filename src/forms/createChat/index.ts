import Block from '../../services/block';
import Button from '../../components/button';
import Input from '../../components/input';
import SearchBlock from '../../components/searchBlock';
import { ChatsController } from '../../controllers/chats';
import { Form, FormDataFormatterInterface } from '../../components/form';
import { IApiChatCreate, IApiChatWithUser } from '../../api/chat';
import { Notification } from '../../components/notification';
import { tpl } from './tpl.hbs';
import './style.scss';

export default class FormCreateChat extends Block<{}> {
  constructor() {
    const chatC = new ChatsController();
    const search = new SearchBlock({
      needList: true,
      required: true,
    });

    const btnSubmit = new Button({
      type: 'submit',
      class: 'button form__button',
      value: 'Создать чат',
      disabled: 'disabled',
      tabindex: 3,
    });
    const inputChatName = new Input({
      tabindex: 1,
      type: 'text',
      id: 'title',
      label: 'Название чата',
      class: 'input-group',
      required: 'required',
    });

    const formContent = new Form({
      id: 'form-create-chat',
      action: '/',
      method: 'post',
      class: 'form flex__item',
      listBlockInputs: [inputChatName, search],
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
            .createChat({
              title: formData.title,
            } as IApiChatCreate)
            .then((response) => {
              chatC.addUsersToChat({
                users: formData.users,
                chatId: response.id,
              } as IApiChatWithUser);
            })
            .finally(() => {
              chatC.getChats();
              resolve('OK');
            });
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
