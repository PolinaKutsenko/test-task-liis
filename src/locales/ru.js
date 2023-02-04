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
      favorites: 'Избранное',
      favoritesHotelCount_one: 'Добавлено в избранное: {{count}} отель',
      favoritesHotelCount_few: 'Добавлено в избранное: {{count}} отеля',
      favoritesHotelCount_many: 'Добавлено в избранное: {{count}} отелей',
      form_of_found_hotels: {
        location: 'Локация',
        date: 'Дата заселения',
        days: 'Количество дней',
        found: 'Найти',
        initial_location: 'Москва',
      },
      form_of_sorted_favorites: {
        sorted_by_price: 'Цена',
        sorted_by_stars: 'Рейтинг',
        increase: 'По возрастанию',
        decrease: 'По убыванию',
      },
      calendar: {
        today: 'Сегодня',
        calendar: 'Календарь',
      },
      hotel_item: {
        price: 'Price',
        currency: '₽',
        daysCount_one: '{{count}} день',
        daysCount_few: '{{count}} дня',
        daysCount_many: '{{count}} дней',
      },
    },
    not_found_page: {
      page_not_found: 'Страница не найдена',
      but_you_can_go: 'Но вы можете перейти',
      to_home_page: 'на главную страницу',
    },
  },
};
