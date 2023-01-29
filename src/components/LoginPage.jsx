import React, { useRef, useEffect } from 'react';
import {
  Form, Button, Card, Container, Row, Col,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

import routes from '../routes.js';
import { useAuth } from '../hooks/index.js';

const FormContainer = ({ children }) => (
  <Container fluid className="h-100">
    <Row className="justify-content-center align-content-center h-100">
      <Col xs="12" md="8" xxl="6">
        <Card>
          <Card.Body className="p-5">
            <Row>
              <Col>
                {children}
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

const LoginPage = () => {
  const auth = useAuth();
  const inputEl = useRef();
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
      username: yup
        .string()
        .email(t('login_page.validation_errors.username.email'))
        .required(t('login_page.validation_errors.username.required')),
      password: yup
        .string()
        .min(8, t('login_page.validation_errors.password.min'))
        .matches(/[^а-яА-ЯёЁ,;:&()*%#-]+/, t('login_page.validation_errors.password.matches'))
        .required(t('login_page.validation_errors.password.required')),
    }),
    onSubmit: () => {
      localStorage.setItem('user', 'authorization');
      auth.logIn();
      navigate(routes.hotelsPagePath());
    },
  });

  return (
    <FormContainer>
      <Form
        onSubmit={formik.handleSubmit}
      >
        <h1 className="text-center mb-4">{t('login_page.nameLoginForm')}</h1>
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
            isValid={formik.touched.username && !formik.errors.username}
            isInvalid={formik.errors.username}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.username}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="password">{t('login_page.password')}</Form.Label>
          <Form.Control
            type="password"
            id="password"
            name="password"
            placeholder="password"
            autoComplete="current-password"
            required
            value={formik.values.password}
            onChange={formik.handleChange}
            isValid={formik.touched.password && !formik.errors.password}
            isInvalid={formik.errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.password}
          </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" variant="outline-primary">{t('login_page.submit')}</Button>
      </Form>
    </FormContainer>
  );
};

export default LoginPage;
