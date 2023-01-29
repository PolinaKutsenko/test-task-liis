import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import {
  Col, Container, Navbar, Row, Card, Form, Button, InputGroup,
} from 'react-bootstrap';
import { useFormik } from 'formik';

import sagaActions from '../slices/saga/sagaActions.js';
import { setSearchParams } from '../slices/searchSlice.js';
import HotelCalendar from './HotelCalendar.jsx';

const HotelForm = ({ t }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const handleCloseCalendar = () => setShowCalendar(false);
  const handleShowCalendar = () => setShowCalendar(true);

  const dispatch = useDispatch();
  const hotelList = useSelector((state) => state.hotels.hotelList);
  const formik = useFormik({
    initialValues: {
      location: `${t('hotel_page.form_of_found_hotels.initial_location')}`,
      date: new Date(),
      days: '1',
    },
    onSubmit: (values) => {
      console.log(values);
      dispatch(setSearchParams(values));
      dispatch({ type: sagaActions.fetch_data });
      console.log(hotelList);
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group>
        <Form.Label htmlFor="location">{t('hotel_page.form_of_found_hotels.location')}</Form.Label>
        <Form.Control
          id="location"
          name="location"
          required
          value={formik.values.location}
          onChange={formik.handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="date">{t('hotel_page.form_of_found_hotels.date')}</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control
            id="date"
            name="date"
            required
            value={formik.values.date}
            onChange={formik.handleChange}
          />
          <Button variant="primary" onClick={handleShowCalendar}><i className="far fa-calendar" /></Button>
          <HotelCalendar data={{ showCalendar, handleCloseCalendar }} />
        </InputGroup>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="days">{t('hotel_page.form_of_found_hotels.days')}</Form.Label>
        <Form.Control
          id="days"
          name="days"
          required
          value={formik.values.days}
          onChange={formik.handleChange}
        />
      </Form.Group>
      <Button type="submit">{t('hotel_page.form_of_found_hotels.found')}</Button>
    </Form>
  );
};

const HotelPage = () => {
  const [currentDate, setDate] = useState(null);
  const dateOptions = { month: 'long', year: 'numeric', day: 'numeric' };
  // const hotelList = useSelector((state) => state.hotels.hotelList);
  const { t } = useTranslation();
  useEffect(() => {
    const timerId = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  /* const renderHotel = () => hotelList.map((hotel) => (
    <p key={hotel.id}>{hotel.title}</p>
  )); */

  return (
    <Container fluid>
      <Navbar>
        <Container>
          <Navbar.Brand>{t('hotel_page.nameNavBar')}</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>{t('hotel_page.signOut')}</Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container fluid className="h-900">
        <Row className="justify-content-center align-content-center h-100">
          <Col md={4}>
            <Row>
              <Card>
                <Card.Body className="p-5">
                  <HotelForm t={t} />
                </Card.Body>
              </Card>
            </Row>
            <Row>
              <Card>
                <Card.Body className="p-5">
                  <Card.Title>title</Card.Title>
                  <Card.Text>title</Card.Text>
                </Card.Body>
              </Card>
            </Row>
          </Col>
          <Col md={8}>
            <Card>
              <Card.Body className="p-5">
                <Card.Title>{ currentDate ? currentDate.toLocaleString('ru', dateOptions) : ''}</Card.Title>
                <Card.Text>Hotels</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default HotelPage;
