import Block from '../../services/block';
import Validate from '../../services/validate';
import { tpl } from './tpl.hbs';
import './style.scss';

export interface TInput {
  id: string;
  type: string;
  class?: string;
  placeholder?: string;
  label?: string;
  tabindex?: number;
  required?: string | null;
  disabled?: string | null;
  title?: string;
  name?: string;
  onInput?: (e: Event) => void;
  onKeyup?: (e: Event) => void;
  onBlur?: (e: Event) => void;
  _input?: HTMLInputElement;
}

interface validClassProps {
  errorMsg: string;
  isValid: true;
  start: Function;
}

const validClass = new Validate();

export default class Input extends Block<TInput> {
  public _input: HTMLInputElement | null;
  _helper: HTMLElement | null;
  _inputId: string;
  validporp: validClassProps;
  public isValid: boolean = true;

  constructor(props: TInput) {
    const newProps = {
      ...props,
      onBlur: (e) => this.handlerOnBlurInput(e),
      onInput: (e) => this.handlerOnBlurInput(e),
    } as TInput;
    super('div', newProps);
    this._input = this.getContent()?.querySelector('input')!;
    this._inputId = this._input.id;

    this._helper = this.getContent()?.querySelector('.input-group__helper') as HTMLElement;
  }

  handlerOnBlurInput(e) {
    validClass.start(e.target, e.target.name, e.target.value, !!this.props?.required);
    this._helper!.textContent = '';
    this.addErrorHelper(validClass.errorMsg);
  }

  addErrorHelper(text) {
    this._helper!.textContent = text;
  }

  render(): Node {
    return this.compile(tpl) as Node;
  }
}
