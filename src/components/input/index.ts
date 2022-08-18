import { tpl } from './tpl.hbs';
import Block from '../../services/block';
import Validate from '../../services/validate';
import './style.scss';

interface inputProps {
  id: string;
  type: string;
  class: string;
  label: string;
  tabindex?: number;
  title?: string;
  name?: string;
}
interface validClassProps {
  errorMsg: string;
  isValid: true;
  start: Function;
}

export default class Input extends Block {
  _input: HTMLInputElement | null;
  _helper: HTMLElement | null;
  _inputId: string;
  validporp: validClassProps;
  public isValid: boolean = true;

  constructor(props: inputProps) {
    super('div', props);

    this._input = this.getContent()!.querySelector('input')!;
    this._inputId = this._input.id;
    this._helper = this.getContent()!.querySelector('.input-group__helper');
    this.validporp = new Validate(this._inputId) as validClassProps;
  }

  addEvents() {
    this.element!.querySelector('input')!.addEventListener('blur', this.handlerOnBlur.bind(this));
    this.element!.querySelector('input')!.addEventListener('input', this.handlerOnBlur.bind(this));
  }

  handlerOnBlur() {
    this._helper!.textContent = '';
    this.validporp.start(this._inputId, this._input!.value);
    this.addErrorHelper(this.validporp.errorMsg);
    if (this._inputId != 'login-add') {
      this.emit('form:input-valid', this._inputId, this._input!.value, this.validporp.isValid);
    }
  }

  addErrorHelper(text) {
    this._helper!.textContent = text;
  }

  render(): Node {
    return this.compile(tpl) as Node;
  }
}
