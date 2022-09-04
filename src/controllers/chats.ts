import { ChatAPI, IApiChat, IApiChatCreate, IApiChatWithUser } from '../api/chat';
import { Notification } from '../components/notification';
import { formatterDate } from '../utils/formatterDate';
import { handlerError } from '../utils/handlerError';
import { loader } from '../loader';
import { store } from '../store';

const chat = new ChatAPI();

export class ChatsController {
  public getChats(props?: any, needLoader: boolean = true) {
    if (needLoader) {
      loader.show();
    }

    return chat
      .getChats(props)
      .then((response) => {
        const chats = this._prepareListChats(response);
        store.setState({ chats });
        return chats;
      })
      .catch(handlerError)
      .finally(() => loader.hide());
  }

  public createChat(props: IApiChatCreate) {
    loader.show();

    return chat
      .createChat(props)
      .then((response) => {
        new Notification('success', 'Новый чат создан');

        this.getChats();
        return response;
      })
      .catch(handlerError)
      .finally(() => loader.hide());
  }

  public deleteChat(chatId) {
    loader.show();

    return chat
      .deleteChat(chatId)
      .then((response) => {
        new Notification('success', 'Чат удален');

        this.getChats();
        return response;
      })
      .catch(handlerError)
      .finally(() => loader.hide());
  }

  public addUsersToChat(listUser: IApiChatWithUser) {
    loader.show();

    return chat
      .addUsersToChat(listUser)
      .then((response) => {
        new Notification('success', 'Пользователи добавлены');

        return response;
      })
      .catch(handlerError)
      .finally(() => loader.hide());
  }

  public deleteUsersFromChat(listUser: IApiChatWithUser) {
    loader.show();

    return chat
      .deleteUsersFromChat(listUser)
      .then((response: IApiChat) => {
        new Notification('success', 'Пользователи удалены');

        this.getChats();
        return response;
      })
      .catch(handlerError)
      .finally(() => loader.hide());
  }

  public requestTokenByChatId(chatId: number) {
    loader.show();

    return chat
      .requestTokenByChatId(chatId)
      .then((response) => {
        store.setState({ token: response.token });
        return response.token;
      })
      .catch(handlerError)
      .finally(() => loader.hide());
  }

  public getListUserByChat(chatId: number) {
    loader.show();

    return chat
      .getListUserByChat(chatId)
      .then((response) => {
        return response;
      })
      .catch(handlerError)
      .finally(() => loader.hide());
  }

  private _prepareListChats(listChats: IApiChat[]) {
    const res: any = [];
    let userInfo;
    if ('id' in store.state?.userInfo) {
      userInfo = store.state?.userInfo?.id;
    }

    listChats.forEach((informationChat) => {
      const lastMsg = informationChat.last_message;
      res.push({
        ...informationChat,
        timeFormatted: formatterDate(lastMsg?.time || null),
        isOwn: userInfo!['login'] === (lastMsg?.user?.login || null),
      });
    });
    return res;
  }
}
