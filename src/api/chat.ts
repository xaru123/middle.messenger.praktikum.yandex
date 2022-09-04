import { BaseAPI } from './base';
import { IApiUser } from './user';

export interface IApiChatCreate extends FormData {
  title: string;
}

export interface IApiChatWithUser extends FormData {
  users: string[];
  chatId: number;
}

export type ILastMsg = {
  user: IApiUser;
  time: string;
  content: string;
  id: number;
};

export interface IApiChat extends FormData {
  id: number;
  title: string;
  avatar: string | null;
  created_by: number;
  unread_count: number;
  last_message: ILastMsg;
}

export class ChatAPI extends BaseAPI {
  constructor() {
    super('/chats');
  }

  getChats(data) {
    return this.get('/', {
      withCredentials: true,
      data: JSON.stringify(data),
    });
  }

  createChat(data: IApiChatCreate) {
    return this.post('/', {
      withCredentials: true,
      data: JSON.stringify(data),
    });
  }

  deleteChat(chatId) {
    return this.delete('/', {
      withCredentials: true,
      data: JSON.stringify(chatId),
    });
  }

  addUsersToChat(data) {
    return this.put('/users', {
      withCredentials: true,
      data: JSON.stringify(data),
    });
  }

  deleteUsersFromChat(data) {
    return this.delete('/users', {
      withCredentials: true,
      data: JSON.stringify(data),
    });
  }

  requestTokenByChatId(id) {
    return this.post(`/token/${id}`, {
      withCredentials: true,
    });
  }

  getListUserByChat(id) {
    return this.get(`/${id}/users`, {
      withCredentials: true,
    });
  }
}
