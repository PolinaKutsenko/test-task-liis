import React, { useRef, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

import routes from '../routes.js';

const FormContainer = ({ children }) => (
  <div className="container-fluid h-100 loginPage">
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
        <div className="card shadow-sm">
          <div className="card-body row p-5">
            {children}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const LoginPage = () => {
  const inputEl = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: yup.object().shape({
      username: yup.string().min(6).required('Please enter your username'),
      password: yup.string().min(6).required('Please enter your password'),
    }),
    onSubmit: (values) => {
      try {
        console.log(values);
        console.log(location);
        // const { from } = location.state || { from: { pathname: '/'}};
        navigate(routes.hotelsPagePath());
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <FormContainer>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group>
          <Form.Label htmlFor="username">{t('login_page.username')}</Form.Label>
          <Form.Control
            id="username"
            name="username"
            placeholder="username"
            autoComplete="username"
            required
            ref={inputEl}
            value={formik.values.username}
            onChange={formik.handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="username">{t('login_page.password')}</Form.Label>
          <Form.Control
            id="password"
            name="password"
            placeholder="password"
            autoComplete="current-password"
            required
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <Form.Control.Feedback type="invalid">The username or password is incorrect</Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" variant="outline-primary">Submit</Button>
      </Form>
    </FormContainer>
  );
};

export default LoginPage;
