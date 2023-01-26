import React from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './components/App';
import ru from './locales/ru.js';

const init = () => {
  const i18nextInstance = i18n.createInstance();
  i18nextInstance.use(initReactI18next).init({
    lng: 'ru',
    debug: true,
    resources: {
      ru,
    },
    interpolation: {
      escapeValue: false,
    },
  });

  return (
    <BrowserRouter>
      <I18nextProvider i18n={i18nextInstance}>
        <App />
      </I18nextProvider>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(init());
