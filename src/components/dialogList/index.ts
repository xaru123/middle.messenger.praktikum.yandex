import { tpl } from './tpl.hbs';
import Block from '../../services/block';
import './style.scss';
import SearchBlock from '../searchBlock';
import DialogItem from '../dialogItem';
import Avatar from '../avatar';

const data = [
  {
    userName: 'Андрей',
    text: 'Изображения',
    time: '10:49',
    isLastFromThat: false,
  },
  { userName: 'Киноклуб', text: 'Стикер', time: '10:49', isLastFromThat: true },
  {
    userName: 'Игорь',
    text: 'Друзья, у меня для вас особененное ооооооооооооооочень длинное сообщение',
    time: 'ПН',
    isLastFromThat: true,
  },
];

interface DialogListProps {
  searchBlock: Block;
  class: string;
  listBlockDialogItem: Block[];
}

const searchBlock = new SearchBlock();
const listBlockDialogItem = [];
data.forEach((item) => {
  const dialogItemCur = new DialogItem({
    avatar: new Avatar({
      src: '',
    }),
    ...item,
  }) as Block;
  // @ts-ignore
  listBlockDialogItem.push(dialogItemCur);
});

export default class DialogList extends Block {
  constructor() {
    const newProps = {
      class: 'dialogs-block',
      searchBlock,
      listBlockDialogItem,
    } as DialogListProps;
    super('div', newProps);
  }

  addEvents() {
    const dialogList = this._element!.querySelectorAll('.dialog-list');

    if (dialogList.length == 0) {
      return [];
    }
    const dialogsRows = dialogList[0].querySelectorAll('.dialog-list__row');

    dialogsRows.forEach((row) => {
      row.addEventListener('click', () => {
        this.clearClassSelected(dialogsRows);
        row.classList.add('selected');
        this.emit('dialog:chat-open', true);
      });
    });

    dialogList[0].addEventListener('click', (e: Event) => {
      const el = e.target as HTMLElement;
      if (!el.classList.contains('dialog-list')) {
        return [];
      }
      this.clearClassSelected(dialogsRows);

      this.emit('dialog:chat-open', false);
    });

    super.addEvents();
  }

  clearClassSelected(dialogsRows) {
    dialogsRows.forEach(function (row2) {
      row2.classList.remove('selected');
    });
  }

  render(): Node {
    return this.compile(tpl) as Node;
  }
}
