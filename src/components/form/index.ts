import Block from '../../services/block';
import { tpl } from './tpl.hbs';
import Button from '../button';
import './style.scss';

interface FormProps {
  id?: string;
  class: string;
  listBlockInputs?: Block[];
  listBlockBtn?: Block[];
  action?: string;
  method?: string;
  button?: Button;
}

interface filterValue {
  0: string;
  1: {
    value: string | number;
    valid: boolean;
  };
}

export default class Form extends Block {
  _formData;

  constructor(props: FormProps) {
    super('form', props);

    const d = new FormData(this._element as HTMLFormElement);
    const res = {};
    for (const pair of d.entries()) {
      res[pair[0]] = { value: pair[1], valid: false };
    }
    this._formData = res;
  }

  addEvents() {
    this.props.listBlockInputs.forEach((item) => {
      item.on('form:input-valid', this.changeValidFormByInput.bind(this));
      this.on(`input:add-error-${item._inputId}`, item.addErrorHelper.bind(item));
    });
    if (this.props.listBlockBtn) {
      this.props.listBlockBtn.forEach((item) => {
        this.on('form:disabled-btn', this.disabledBtnByForm.bind(item));
      });
    }
    this._element!.onsubmit = () => {
      this.emitSubmit();
      return false;
    };
    super.addEvents();
  }

  changeValidFormByInput(inputId, value, signFromInput) {
    this._formData[inputId] = { value, valid: signFromInput };
    const checkFormValid = this.checkForm();
    if (this.props.listBlockBtn) {
      this.emit('form:disabled-btn', checkFormValid);
    }
  }

  checkForm() {
    let notValidCount = 0;
    let textError = '';

    Object.entries(this._formData).forEach((itemCur) => {
      const item = itemCur as filterValue;
      if (!item[1].valid) {
        notValidCount++;
      }
      if (item[0] == 'oldPassword' || item[0] == 'newPassword') {
        if (
          this._formData['oldPassword'].value != this._formData['newPassword'].value &&
          this._formData['oldPassword'].valid &&
          this._formData['newPassword'].valid
        ) {
          notValidCount++;
          textError = 'Разные пароли';
          this.emit('input:add-error-oldPassword', textError);
          this.emit('input:add-error-newPassword', textError);
        }
        if (
          this._formData['oldPassword'].value == this._formData['newPassword'].value &&
          this._formData['oldPassword'].valid &&
          this._formData['newPassword'].valid
        ) {
          this.emit('input:add-error-oldPassword', null);
          this.emit('input:add-error-newPassword', null);
        }
      }
    });
    return notValidCount == 0;
  }

  disabledBtnByForm(res: boolean) {
    if (res) {
      this.setProps({ disabled: null });
    } else {
      this.setProps({ disabled: 'disabled' });
    }
  }

  emitSubmit() {
    const validForm = this.checkForm();
    if (!validForm) {
      console.log('Форма не валидна ', this._formData);
      return [];
    }
    console.log('Данные для отправки', this._formData);
  }

  render(): Node {
    return this.compile(tpl) as Node;
  }
}
