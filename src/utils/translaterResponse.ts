export function translaterResponse(text: string): string {
  switch (text) {
    case 'Login or password is incorrect':
      return 'Неправильные логин или пароль';
    case 'phone is not valid':
      return 'Поле "телефон" введено не по формату';
    case 'login is empty, but required':
      return 'Поле "логин" почему-то пустое';
    case 'User already in system':
      return 'Кто-то уже авторизован в системе';
    case 'Cookie is not valid':
      return 'Вы не в системе. Авторизуйтесь, пожалуйста';
    case 'No chat':
      return 'Чат не выбран';
    case 'Not found':
      return 'Не найдено';
    default:
      return text;
  }
}
