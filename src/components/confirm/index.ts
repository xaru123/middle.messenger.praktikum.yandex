import Block from '../../services/block';
import Button from '../button';
import Icon from '../icon';
import { tpl } from './tpl.hbs';
import './style.scss';

export interface IConfirm {
  question: string;
  acceptFunction: () => void;
}

export default class Confirm extends Block<IConfirm> {
  constructor(props: IConfirm) {
    const iconQuestion = new Icon({
      value: 'question_mark',
    });
    const buttonAccept = new Button({
      type: 'submit',
      value: 'Да',
      class: 'button button-danger',
      onClick: () => props.acceptFunction(),
    });
    const newProps = {
      ...props,
      iconQuestion,
      buttonAccept,
    } as IConfirm;
    super('div', newProps);
  }

  render(): Node {
    return this.compile(tpl) as Node;
  }
}
