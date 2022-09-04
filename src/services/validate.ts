interface IObject {
  [index: string]: any;
}

interface IValidateChecking {
  check: RegExp;
  errorMsg: string;
}

function clearClassProp(_target: IObject, _name: string | symbol, descriptor: IObject) {
  const originalMethod = descriptor.value as Function;

  descriptor.value = function (...args) {
    this.isValid = true;
    this.errorMsg = ' ';
    return originalMethod.call(this, ...args);
  };
}

export default class Validate {
  errorMsg: string = '';
  listRegex: IValidateChecking[];
  isValid: boolean = true;

  constructor() {}

  getListRegex(property) {
    switch (property) {
      case 'first_name':
      case 'second_name':
        this.listRegex = [
          {
            check: /^[A-ZА-ЯЁ]/,
            errorMsg: 'Первая буква не заглавная',
          },
          {
            check: /^[а-яА-ЯЁёA-Za-z-]+$/,
            errorMsg: 'Спецсимволы и цифры не разрешены, только "-"',
          },
        ];
        break;
      case 'login':
        this.listRegex = [
          {
            check: /^[0-9A-Za-z-_]+$/,
            errorMsg: `Спецсимволы и цифры не разрешены, только "-", "_"`,
          },
          {
            check: /.{3,}/,
            errorMsg: 'Минимальная длина - 3 символа',
          },
          {
            check: /.{3,20}/,
            errorMsg: 'Максимальная длина - 20 символов',
          },
          {
            check: /^[0-9]*[a-zA-Z-_]+[a-zA-Z0-9-_]*$/,
            errorMsg: 'Содержит только цифры',
          },
        ];
        break;
      case 'email':
        this.listRegex = [
          {
            check: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]*[a-z]{1}\.[a-z]{2,6}$/i,
            errorMsg: 'Неверный формат',
          },
        ];
        break;
      case 'password':
      case 'oldPassword':
      case 'newPassword':
        this.listRegex = [
          {
            check: /(?=.*[A-ZА-ЯЁ])/,
            errorMsg: 'Нет заглавной буквы',
          },
          {
            check: /.{8,}/,
            errorMsg: 'Минимальная длина - 8 символов',
          },
          {
            check: /.{8,40}/,
            errorMsg: 'Максимальная длина - 40 символов',
          },
        ];
        break;
      case 'phone':
        this.listRegex = [
          {
            check: /^[+]?[0-9]+$/,
            errorMsg: 'Только цифры, может начинаться с +',
          },
          {
            check: /.{10,}/,
            errorMsg: 'Минимальная длина - 10 символов',
          },
          {
            check: /.{10,15}/,
            errorMsg: 'Максимальная длина - 15 символов',
          },
        ];
        break;
    }
  }

  isEmpty(value): boolean {
    if (value && value != '') {
      return true;
    }
    return false;
  }

  isCirillic(value): boolean {
    return /[а-яА-ЯЁё]/.test(value);
  }

  isLatin(value): boolean {
    return /[a-zA-Z]/.test(value);
  }

  isDigital(value): boolean {
    return /[0-9]/.test(value);
  }

  @clearClassProp
  start(input, property: string, value, required: boolean | null = false): void {
    this.getListRegex(property);

    if (!this.isEmpty(value)) {
      this.isValid = false;
      if (required) {
        this.errorMsg = 'Обязательное поле';
      }
      input.isValid = false;
      return;
    }
    if (this.listRegex) {
      this.checkCommon(property, value);
      if (this.isValid) {
        this.checkByRegex(value);
      }
    }
    input.isValid = this.isValid;
  }

  checkCommon(property: string, value): void {
    switch (property) {
      case 'first_name':
      case 'second_name':
        if (!this.isCirillic(value) && !this.isLatin(value)) {
          this.errorMsg = 'Только кириллица или латиница';
          this.isValid = false;
        }
        break;
      case 'login':
        if (!this.isLatin(value) && !this.isDigital(value)) {
          this.errorMsg = 'Только латиница';
          this.isValid = false;
        }
        break;
      case 'email':
        if (!this.isLatin(value) && !this.isDigital(value)) {
          this.errorMsg = 'Только латиница';
          this.isValid = false;
        }
        break;
      case 'phone':
        if (!this.isDigital(value)) {
          this.errorMsg = `Только цифры, может начинаться с "+"`;
          this.isValid = false;
        }
        break;
    }
  }

  checkByRegex(value): void {
    this.listRegex.forEach((item) => {
      if (!this.isValid) {
        return;
      }
      if (item.check.test(value) == false) {
        this.errorMsg = item.errorMsg;
        this.isValid = false;
      }
    });
  }
}
