import Block from '../../services/block';
import FormCreateChat from '../../forms/createChat';
import Icon, { TIcon } from '../icon';
import SearchBlock, { ISearchBlock } from '../searchBlock';
import { Modal } from '../modal';
import { tpl } from './tpl.hbs';
import './style.scss';

interface IChat {
  class: string;
  listBlockDialogItem: [];
  searchBlock: Block<ISearchBlock>;
  iconAddChat: Block<TIcon>;
}

export default class DialogList extends Block<IChat> {
  constructor() {
    const searchBlock = new SearchBlock();

    const iconAddChat = new Icon({
      value: 'add_comment',
      class: 'material-icons md-36 icon',
      onClick: () => {
        const newForm = new FormCreateChat();
        new Modal({
          headerTitle: 'Создать чат',
          listBlockContent: [newForm],
        });
      },
    });

    const newProps = {
      class: 'dialogs-block',
      listBlockDialogItem: [],
      searchBlock,
      iconAddChat,
    } as IChat;
    super('div', newProps);
  }

  render(): Node {
    return this.compile(tpl) as Node;
  }
}
