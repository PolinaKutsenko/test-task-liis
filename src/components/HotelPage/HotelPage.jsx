import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import {
  Col, Container, Navbar, Row, Card, Form, Button, InputGroup,
} from 'react-bootstrap';
import { useFormik } from 'formik';

import sagaActions from '../../slices/saga/sagaActions.js';
import { setSearchParams } from '../../slices/searchSlice.js';
import { show } from '../../slices/calendarSlice.js';
import HotelCalendar from './HotelCalendar.jsx';
// import HotelItem from './HotelItem.jsx';

export const formatDate = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1) > 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
  const day = date.getDate() > 10 ? date.getDate() : `0${date.getDate()}`;
  return `${day}.${month}.${year}`;
};

const HotelForm = ({ t }) => {
  const dispatch = useDispatch();
  const hotelList = useSelector((state) => state.hotels.hotelList);
  const selectedDate = useSelector((state) => state.calendar.date);

  const formik = useFormik({
    initialValues: {
      location: `${t('hotel_page.form_of_found_hotels.initial_location')}`,
      date: formatDate(selectedDate),
      days: '1',
    },
    onSubmit: (values) => {
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
          <Button variant="secondary" onClick={() => dispatch(show())}><i className="far fa-calendar" /></Button>
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
      <Button variant="secondary" type="submit">{t('hotel_page.form_of_found_hotels.found')}</Button>
    </Form>
  );
};

const HotelPage = () => {
  // const hotelList = useSelector((state) => state.hotels.hotelList);
  const { t } = useTranslation();

  /* const renderHotel = () => hotelList.map((hotel) => (
    <p key={hotel.id}>{hotel.title}</p>
  )); */

  return (
    <>
      <HotelCalendar />
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
                  <Card.Title>date</Card.Title>
                  <Card.Text>Hotels</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default HotelPage;
