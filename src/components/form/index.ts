import Block from '../../services/block';
import { IButton } from '../button';
import { tpl } from './tpl.hbs';
import './style.scss';

export interface IForm {
  id?: string;
  class: string;
  listBlockInputs?: Block<{}>[];
  listBlockBtn?: Block<IButton>[];
  action?: string;
  method?: string;
  submitCallback: (formData: FormDataFormatterInterface, contextForm?: Block<{}>, e?: Event) => Promise<string>;
  onChange?: (e?: Event) => void;
  onSubmit?: (e?: Event) => void;
}

type TTypicalForValue = string | number | string[];

export interface FormDataFormatterInterface {
  [index: string]: TTypicalForValue;
}

type TFormValue = {
  value: TTypicalForValue;
  valid: boolean;
};

export interface FormDataInterface {
  [index: string]: TFormValue;
}

interface FilterValueInterface {
  0: string;
  1: TFormValue;
}

export class Form extends Block<IForm> {
  _formData: FormDataInterface;

  constructor(props: IForm) {
    super('form', {
      ...props,
      onChange: (e: Event) => {
        const elementInForm = e.target;
        this.changeValidFormByInput(elementInForm);
      },
      onSubmit: (e: Event) => {
        e.preventDefault();
        const elementForm = e.target;
        if (!this.props.submitCallback) {
          return false;
        }
        if (this.checkForm()) {
          this.props
            .submitCallback(this.formDataFormatter(), this, e)
            .then((status) => {
              if (status == 'OK') {
                this.resetForm(elementForm);
                e.preventDefault();
                return false;
              }
            })
            .catch(() => {});
        }
        return false;
      },
    });

    this.disabledBtnByForm(false);
    this.initFormData();
  }

  resetForm(elementForm) {
    elementForm.reset();
    this.disabledBtnByForm(false);
  }

  formDataFormatter(): FormDataFormatterInterface {
    const formatted = {} as FormDataFormatterInterface;
    for (const dataItem in this._formData) {
      switch (dataItem) {
        case 'checkbox':
          const list = this._formData[dataItem].value as unknown as TFormValue[];
          list.forEach((checkboxInfo: TFormValue) => {
            const stringValue = checkboxInfo.value as string;
            const splitParam = stringValue.split('-') as string[];
            if (!formatted[splitParam[0]]) {
              formatted[splitParam[0]] = [];
            }
            const currentFormatter = formatted[splitParam[0]] as string[];
            currentFormatter.push(splitParam[1]);
          });
          break;
        case 'file':
          formatted[dataItem] = this._formData[dataItem].value;
          break;
        default:
          formatted[dataItem] = this._formData[dataItem].value;
      }
    }
    return formatted;
  }

  initFormData() {
    const d = new FormData(this._element as HTMLFormElement);
    const res = {};
    for (const pair of d.entries()) {
      res[pair[0]] = { value: pair[1], valid: true };
    }
    this._formData = res;
  }

  changeValidFormByInput(elementInForm) {
    switch (elementInForm.type) {
      case 'checkbox':
        if (!this._formData['checkbox']) {
          this._formData['checkbox'] = { value: [], valid: true };
        }
        const newR = [
          {
            value: elementInForm.name,
            valid: elementInForm.checked,
          },
        ] as TFormValue[];
        const prevR = this._formData['checkbox'].value as unknown as TFormValue[];

        if (elementInForm.checked) {
          this._formData['checkbox'].value = [...prevR, ...newR] as [];
        } else {
          const list = this._formData['checkbox'].value as unknown as TFormValue[];
          list.map((item, i) => {
            if (item.value == elementInForm.name) {
              list.splice(i, 1);
              return;
            }
          });
        }
        break;
      case 'file':
        this._formData[elementInForm.name].valid = true;
        this._formData[elementInForm.name].value = elementInForm.files[0];
        break;
      default:
        this._formData[elementInForm.name].valid = elementInForm.isValid;
        this._formData[elementInForm.name].value = elementInForm.value;
    }
    const checkFormValid = this.checkForm();
    this.disabledBtnByForm(checkFormValid);
  }

  checkForm() {
    let notValidCount = 0;
    let textError = '';
    const errorTextContent = this._element?.querySelector('.form-problem') as Node;
    errorTextContent.textContent = '';

    Object.entries(this._formData).forEach((itemCur) => {
      const item = itemCur as FilterValueInterface;
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
          errorTextContent.textContent = textError;
        }
      }
    });
    return notValidCount == 0;
  }

  disabledBtnByForm(signValidForm: boolean) {
    this.props.listBlockBtn?.filter((buttonBlock: Block<IButton>) => {
      if (buttonBlock.props.type == 'submit') {
        buttonBlock.setProps({ disabled: !signValidForm ? 'disabled' : null });
      }
    });
  }

  render(): Node {
    return this.compile(tpl) as Node;
  }
}
