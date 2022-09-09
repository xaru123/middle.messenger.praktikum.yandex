import Block from '../../services/block';
import Button from '../../components/button';
import Input from '../../components/input';
import { Form, FormDataFormatterInterface } from '../../components/form';
import { IApiUser } from '../../api/user';
import { UserController } from '../../controllers/user';
import { router } from '../../router';
import { store } from '../../store';
import { tpl } from './tpl.hbs';
import './style.scss';

export default class FormChangeProfile extends Block<{}> {
  constructor(props) {
    const btnSubmit = new Button({
      type: 'submit',
      class: 'button form__button',
      value: 'Сохранить',
      title: 'Сохранить',
    });
    const btnBack = new Button({
      type: 'button',
      class: 'button form__button button_small',
      value: 'Назад',
      title: 'Назад',
      onClick: (e) => {
        e.stopPropagation();
        e.preventDefault();

        router.back();
      },
    });
    const inputMail = new Input({
      type: 'text',
      id: 'email',
      name: 'email',
      label: 'Почта',
      class: 'input-group',
    });
    const inputLogin = new Input({
      type: 'text',
      id: 'login',
      name: 'login',
      label: 'Логин',
      class: 'input-group',
    });
    const inputName = new Input({
      type: 'text',
      id: 'first_name',
      name: 'first_name',
      label: 'Имя',
      class: 'input-group',
    });
    const inputName2 = new Input({
      type: 'text',
      id: 'second_name',
      name: 'second_name',
      label: 'Фамилия',
      class: 'input-group',
    });
    const inputNick = new Input({
      type: 'text',
      id: 'display_name',
      name: 'display_name',
      label: 'Имя в чате',
      class: 'input-group',
    });
    const inputPhone = new Input({
      type: 'tel',
      id: 'phone',
      name: 'phone',
      label: 'Телефон',
      class: 'input-group',
    });

    const formContent = new Form({
      id: 'form-change-profile',
      class: 'form flex__item',
      listBlockInputs: [inputMail, inputLogin, inputName, inputName2, inputNick, inputPhone],
      listBlockBtn: [btnBack, btnSubmit],
      submitCallback: (formData: FormDataFormatterInterface): Promise<string> => {
        return new Promise((resolve) => {
          const userC = new UserController();
          userC.changeProfile(formData as unknown as IApiUser).then(() => {
            resolve('OK');
          });
        });
      },
    });
    const newProps = {
      formContent,
      class: 'content-form content-form-profile',
      headerTitle: 'Изменить данные',
      ...props,
    };

    super('div', newProps);
  }

  componentDidMount() {
    store.subscribe((state) => {
      this.setFormValues(state.userInfo);
    });
  }

  setFormValues(data: IApiUser) {
    const formC = this.children.formContent as Form;
    const formCListInput = formC.props.listBlockInputs as unknown as Input[];
    formCListInput.forEach((item) => {
      item._input!.value = data[item._inputId] ?? 0;
    });

    formC.initFormData();
    const checkFormValid = formC.checkForm();
    formC.disabledBtnByForm(checkFormValid);
  }

  render(): Node {
    return this.compile(tpl) as Node;
  }
}
