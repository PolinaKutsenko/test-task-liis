import { useTranslation } from 'react-i18next';
import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import cn from 'classnames';

import loginPageBackground from '../assets/loginPageBackground.png';
import '../css/LoginPage.css';
import routes from '../routes.js';
import { useAuth } from '../hooks/index.js';

const LoginPage = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const inputEl = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: yup.object().shape({
      username: yup
        .string()
        .email(t('login_page.validation_errors.username.email'))
        .required(t('login_page.validation_errors.username.required')),
      password: yup
        .string()
        .matches(/[^а-яА-ЯёЁ,;:&()*%#-]+/, t('login_page.validation_errors.password.matches'))
        .min(8, t('login_page.validation_errors.password.min'))
        .required(t('login_page.validation_errors.password.required')),
    }),
    onSubmit: () => {
      localStorage.setItem('user', 'authorization');
      auth.logIn();
      navigate(routes.hotelsPagePath());
    },
  });

  const getLableClassNames = (field) => (
    cn('form-label-login-page', {
      'invalid-label-login-page': formik.errors[field] && formik.touched[field],
    })
  );

  return (
    <>
      <img className="background-image-login-page" src={loginPageBackground} alt="background" />
      <div className="fade-login-page" />
      <div className="form-container-login-page">
        <form onSubmit={formik.handleSubmit}>
          <h1 className="simple-hotel">{t('login_page.nameLoginForm')}</h1>
          <div>
            <label className={getLableClassNames('username')} htmlFor="username">{t('login_page.username')}</label>
            <input
              name="username"
              required
              id="username"
              className="form-control-input"
              ref={inputEl}
              value={formik.values.username}
              onChange={formik.handleChange}
            />
            {formik.errors.username && formik.touched.username && <div className="invalid-feedback-login-page">{formik.errors.username}</div>}
          </div>
          <div>
            <label className={getLableClassNames('password')} htmlFor="password">{t('login_page.password')}</label>
            <input
              name="password"
              required
              type="password"
              id="password"
              className="form-control-input"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            {formik.errors.password && formik.touched.username && <div className="invalid-feedback-login-page">{formik.errors.password}</div>}
          </div>
          <button type="submit" className="button-login-page"><p>{t('login_page.submit')}</p></button>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
