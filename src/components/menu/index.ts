import Avatar from '../avatar';
import Block from '../../services/block';
import Button from '../button';
import Confirm from '../confirm';
import Icon from '../icon';
import Link from '../link';
import env from '../../utils/env';
import { AuthController } from '../../controllers/auth';
import { Modal } from '../modal';
import { store } from '../../store';
import { tpl } from './tpl.hbs';
import './style.scss';

export default class Menu extends Block<{}> {
  constructor() {
    const linkMsg = new Link({
      id: 'link-msg',
      href: '/messenger',
      class: 'link menu__item menu__item-msg menu__item_center',
      value: new Icon({
        value: 'chat',
      }),
    });

    const linkSettings = new Link({
      id: 'link-settings',
      href: '/settings',
      class: 'link menu__item menu__item-setting',
      value: new Icon({
        value: 'settings',
      }),
    });

    const linkExit = new Button({
      type: 'button',
      id: 'btn-exit',
      class: 'menu__item menu__item-exit',

      value: new Icon({
        value: 'logout',
        class: ' material-icons icon',
      }),
      onClick: (e) => {
        const newM = new Modal({
          listBlockContent: [],
          headerTitle: 'Требуется подтверждение',
        });

        const newForm = new Confirm({
          question: 'Ты уверен, что хочешь выйти из системы?',
          acceptFunction: () => {
            new AuthController().signOut();
            newM.hide();
          },
        });
        newM.setProps({ listBlockContent: [newForm] });
        newM.show();
        e.stopPropagation();
      },
    });

    const avatar = new Avatar({});
    const newProps = {
      class: 'menu',
      avatar,
      listBlockLinks: [linkMsg, linkSettings, linkExit],
    };
    super('div', newProps);
  }
  protected componentDidMount() {
    store.subscribe((state) => {
      if (state?.userInfo?.avatar) {
        this.children.avatar.setProps({
          src: `${env.SWAGGER_RESOURCES}/${state?.userInfo?.avatar}`,
        });
      }
    });
  }

  render(): Node {
    return this.compile(tpl) as Node;
  }
}
