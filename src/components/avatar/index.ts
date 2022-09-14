import Block from '../../services/block';
// @ts-ignore
import avatarDefault from '../../../static/avatarDefault.png';
import { tpl } from './tpl.hbs';
import './style.scss';

export interface IAvatar {
  src?: string | null;
  class?: string;
  value?: string | Block<{}>;
  id?: string;
  title?: string;
  onClick?: () => void;
}

export default class Avatar extends Block<IAvatar> {
  constructor(props: IAvatar) {
    const src = avatarDefault;

    const newProps = {
      ...props,
      src: `${src}`,
      class: `${props.class ? props.class : ''} avatar`,
    } as IAvatar;
    super('img', newProps);
  }

  render(): Node {
    return this.compile(tpl) as Node;
  }
}
