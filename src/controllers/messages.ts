import { formatterDate } from '../utils/formatterDate';
import { store } from '../store';

export interface IMessage extends FormData {
  id: number;
  content: string;
  time: string;
  user_id: number;
}

export interface IMessageGet extends FormData {
  offset: number;
}

class MessagesController {
  private _wss: WebSocket;
  private _userId: number;
  private _chatId: string;
  private _token: string;
  public ping: NodeJS.Timer;

  constructor() {}

  public createWebSocket(userId: number, chatId: string, token: string) {
    this._userId = userId;
    this._chatId = chatId;
    this._token = token;
    this._wss = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);
    this.addEvents();
  }

  public getMessages(options: IMessageGet) {
    this._wss.send(
      JSON.stringify({
        content: options.offset,
        type: 'get old',
      }),
    );
  }

  sendMessage(message: string) {
    if (message == '') {
      return [];
    }
    this._wss.send(
      JSON.stringify({
        content: message,
        type: 'message',
      }),
    );
  }

  handlerOpen() {
    console.log('Соединение установлено');
    const options = { offset: 0 } as IMessageGet;
    this.getMessages(options);

    this.ping = setInterval(() => {
      this._wss.send('');
    }, 1000 * 5);
  }

  messageFormatter(list) {
    let idUsert;
    if ('id' in store.state?.userInfo) {
      idUsert = store.state?.userInfo?.id;
    }

    if (list.user_id != idUsert) {
      list.type = 'from';
    } else {
      list.type = 'to';
    }
    list.time = formatterDate(list.time);
    return list;
  }

  handlerMessage(e: MessageEvent) {
    let newState = JSON.parse(e.data);
    let listMessages: IMessage[];
    const prevState = store.state.listMessages as IMessage[];
    if (Array.isArray(newState)) {
      if (!Object.keys(newState).length) {
        return store.setState({ ...prevState });
      } else if (newState[0].id === 1) {
        newState = newState.map((item) => this.messageFormatter(item));
        newState = newState.reverse();
        store.setState({ listMessages: newState });
      } else {
        newState = newState.map((item) => this.messageFormatter(item));
        listMessages = [...newState, ...prevState];
        store.setState({ listMessages });
      }
    } else if (typeof newState === 'object' && newState.type === 'message') {
      newState = [this.messageFormatter(newState)];
      listMessages = [...prevState, ...newState];
      store.setState({ listMessages });
    }
  }

  handlerError(event: ErrorEvent) {
    console.log('Ошибка', event.message);
  }

  handlerClose(event: CloseEvent) {
    if (event.wasClean) {
      console.log('Соединение закрыто чисто', 'error');
    } else {
      console.log('Проблемы с подключением', 'error');
    }
    if (event.code === 1006) {
      this._reopen();
    }
  }

  private _reopen() {
    this.createWebSocket(this._userId, this._chatId, this._token);
  }

  public leave() {
    if (this._wss) {
      clearInterval(this.ping);
      this._wss.close();
    }
  }

  addEvents() {
    this._wss.addEventListener('open', () => {
      this.handlerOpen();
    });
    this._wss.addEventListener('close', (e: CloseEvent) => {
      this.handlerClose(e);
    });
    this._wss.addEventListener('message', (e: MessageEvent) => {
      this.handlerMessage(e);
    });
    this._wss.addEventListener('error', (e: ErrorEvent) => {
      this.handlerError(e);
    });
  }
}

export default new MessagesController();
