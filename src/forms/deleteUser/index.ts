import Block from '../../services/block';
import Button from '../../components/button';
import SearchBlock from '../../components/searchBlock';
import { ChatsController } from '../../controllers/chats';
import { Form, FormDataFormatterInterface } from '../../components/form';
import { IApiChatWithUser } from '../../api/chat';
import { Notification } from '../../components/notification';
import { tpl } from './tpl.hbs';
import './style.scss';

export class FormDeleteUser extends Block<{}> {
  constructor() {
    const chatC = new ChatsController();

    const search = new SearchBlock({
      needList: true,
      required: true,
      inputPlaceHolder: 'Выберите из списка ниже',
      inputDisabled: 'disabled',
      listResultSearch: [],
      listBlockInput: [],
    });
    const btnSubmit = new Button({
      type: 'submit',
      class: 'button form__button',
      value: 'Удалить',
    });

    const formContent2 = new Form<IApiChatWithUser>({
      id: 'form-delete-user',
      action: '/',
      method: 'post',
      class: 'form flex__item',
      listBlockInputs: [search],
      listBlockBtn: [btnSubmit],
      submitCallback: (formData: FormDataFormatterInterface<IApiChatWithUser>, contextForm: Block<{}>, e: Event) => {
        const listInputChecked = contextForm?._element?.querySelectorAll(':checked') as NodeListOf<HTMLInputElement>;
        if (listInputChecked && !listInputChecked.length) {
          new Notification('danger', 'Не выбраны пользователи');
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        chatC.deleteUsersFromChat({
          users: formData.users as string[],
          chatId: +localStorage?.getItem('lastOpenedChat')!,
        } as IApiChatWithUser);
      },
    });

    const chatId = +localStorage.getItem('lastOpenedChat')!;
    chatC.getListUserByChat(chatId).then((list) => {
      search.setListUsers.call(search, list);
    });

    super('div', {
      formContent2,
    });
  }

  render(): Node {
    return this.compile(tpl) as Node;
  }
}
