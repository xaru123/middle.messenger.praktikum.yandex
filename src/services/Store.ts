import { EventBus } from './eventBus';
import { IApiChat } from '../api/chat';
import { IApiUser } from '../api/user';
import { IMessage } from '../controllers/messages';

type TStoreState = {
  userInfo: IApiUser | {};
  chats: IApiChat[] | {};
  listMessages: IMessage[] | {};
  selectedChat?: number | {};
  token?: number | null;
};

export class Store extends EventBus {
  static STORE_NAME = 'chatIceCreamStore';
  static EVENTS = {
    FLOW_SDU: 'flow:store-did-update',
    FLOW_SDP: 'flow:store-did-publish',
  };
  static _instance: Store;
  public state: TStoreState;
  public subscribers: Function[] = [];

  constructor(stateProps: TStoreState) {
    if (Store._instance) {
      return Store._instance;
    }
    super();

    this.state = this._makePropsProxy(stateProps);
    Store._instance = this;
    this._registerEvents();
  }

  private _registerEvents(): void {
    this.on(Store.EVENTS.FLOW_SDU, this._storeDidUpdate.bind(this));
    this.on(Store.EVENTS.FLOW_SDP, this.publish.bind(this));
  }

  private _storeDidUpdate() {
    this.emit(Store.EVENTS.FLOW_SDP);
  }

  private _makePropsProxy(state: TStoreState) {
    return new Proxy(state, {
      set: (target, item: string, value: unknown) => {
        target[item] = value;
        const t = this.state;
        this.emit(Store.EVENTS.FLOW_SDU, t, target);
        return true;
      },
      deleteProperty: () => {
        throw new Error('Нет доступа');
      },
    });
  }

  public publish() {
    this.subscribers.forEach((subscriber) => {
      subscriber(this.state);
    });
  }

  public subscribe(subscriber) {
    this.subscribers.push(subscriber);
    subscriber(this.state);
  }

  public setState(nextState) {
    if (!nextState) {
      return;
    }
    Object.assign(this.state, nextState);
  }

  public destroy() {
    this.state = {
      userInfo: {},
      chats: {},
      listMessages: {},
    };
  }
}
