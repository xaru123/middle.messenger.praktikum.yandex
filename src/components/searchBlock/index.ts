import Block from '../../services/block';
import Icon from '../icon';
import Input, { TInput } from '../input';
import { IApiSearch } from '../../api/user';
import { UserController } from '../../controllers/user';
import { tpl } from './tpl.hbs';
import './style.scss';

export interface ISearchBlock {
  class?: string;
  needList?: boolean;
  required?: boolean;
  inputPlaceHolder?: string;
  inputDisabled?: string;
  listResultSearch?: {};
  listBlockInput?: Block<TInput>[];
}

export default class SearchBlock extends Block<ISearchBlock> {
  constructor(props?: ISearchBlock) {
    const user = new UserController();
    const icon = new Icon({
      value: 'search',
      class: 'material-icons md-36 icon search__icon',
    });
    const inpitProps = {
      id: 'search',
      type: 'text',
      class: 'search__input',
      placeholder: props?.inputPlaceHolder ?? 'Начните вводить',
      label: '',
      disabled: props?.inputDisabled ?? null,
      required: props?.required,
      onKeyup: (e: Event) => {
        const target = e.target as HTMLTextAreaElement;
        const login = target?.value;
        if (!login) {
          this.setListUsers([]);
          return;
        }
        const searchProps = { login: login } as IApiSearch;
        user.searchForUserByLogin(searchProps).then((listUser) => {
          this.setListUsers(listUser);
          target.focus();
        });
      },
    } as TInput;

    const input = new Input(inpitProps);

    const newProp = {
      class: 'search',
      icon,
      input,
      listResultSearch: {},
      listBlockInput: [],
      needList: props?.needList ?? false,
    } as ISearchBlock;
    super('div', newProp);
  }

  setListUsers(listUser) {
    const listBlockInput: Block<{}>[] = [];

    listUser.forEach((item) => {
      const inpitProps = {
        type: 'checkbox',
        id: `users-${item.id}`,
        class: 'search__input',
        label: `${item.first_name} ${item.second_name} (${item.login})`,
      } as TInput;
      const newInput = new Input(inpitProps);
      listBlockInput.push(newInput);
    });
    this.setProps({ listResultSearch: listUser, listBlockInput: listBlockInput });
    if (this.props.needList) {
      this.showSearchResult();
    }
  }

  showSearchResult() {
    const list = this._element?.querySelector('.list-search') as HTMLElement;
    list?.querySelectorAll('.list-search__user').forEach((elemLi: HTMLElement) => {
      setTimeout(() => elemLi.classList.add('show'), 10);
    });
  }

  render(): Node {
    return this.compile(tpl) as Node;
  }
}
