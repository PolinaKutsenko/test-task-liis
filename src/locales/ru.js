export default {
  translation: {
    login_page: {
      username: 'Логин',
      password: 'Пароль',
      submit: 'Войти',
      nameLoginForm: 'Simple Hotel Check',
      validation_errors: {
        username: {
          email: 'Неверный адрес электронной почты',
          required: 'Пожалуйста, введите Ваш логин',
        },
        password: {
          min: 'Пароль должен быть не менее 8 символов',
          matches: 'Пароль содержит кириллицу или следующие символы: ,;:&()*%#-',
          required: 'Пожалуйста введите ваш пароль',
        },
      },
    },
    hotel_page: {
      hotels: 'Отели',
      nameNavBar: 'Simple Hotel Check',
      signOut: 'Выйти',
      form_of_found_hotels: {
        location: 'Локация',
        date: 'Дата заселения',
        days: 'Количество дней',
        found: 'Найти',
        initial_location: 'Москва',
      },
    },
    not_found_page: {
      page_not_found: 'Страница не найдена',
      but_you_can_go: 'Но вы можете перейти',
      to_home_page: 'на главную страницу',
    },
  },
};
