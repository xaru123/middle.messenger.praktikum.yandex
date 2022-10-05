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

  addEvents() {
    this.element?.querySelector('input')!.addEventListener('blur', this.events['onBlur']);
    this.element?.querySelector('input')!.addEventListener('input', this.events['onInput']);
    this.element?.querySelector('input')?.addEventListener('keyup', this.events['onKeyup']);
  }
  removeEvents() {
    this.element?.querySelector('input')?.removeEventListener('blur', this.events['onBlur']);
    this.element?.querySelector('input')?.removeEventListener('input', this.events['onInput']);
    this.element?.querySelector('input')?.removeEventListener('keyup', this.events['onKeyup']);
  }

  handlerOnBlurInput(e) {
    const validClass = new Validate();
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
