import { Store } from './services/Store';

const store1 = new Store({
  userInfo: {},
  chats: {},
  listMessages: {},
});
// window.appStore = store1;
export const store = store1;
