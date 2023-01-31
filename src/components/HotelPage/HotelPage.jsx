import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import {
  Col, Container, Navbar, Row, Card, Form, Button, InputGroup,
} from 'react-bootstrap';
import { useFormik } from 'formik';

import { useAuth } from '../../hooks/index.js';
import sagaActions from '../../slices/saga/sagaActions.js';
import { setSearchParams, setCounterDaysStay } from '../../slices/searchSlice.js';
import { show } from '../../slices/calendarSlice.js';
import translateCitiesOnRu from '../../locales/translateCitiesOnRu.js';
import formatDateToStringByDot from '../../formatters/formatDateToStringByDot.js';
import formatDateToStringByFullDate from '../../formatters/formatDateToStringByFullDate.js';
import HotelCalendar from './HotelCalendar.jsx';
import HotelItem from './HotelItem.jsx';

const HotelForm = ({ t }) => {
  const dispatch = useDispatch();
  const hotelList = useSelector((state) => state.hotels.hotelList);
  const selectedDate = useSelector((state) => state.calendar.date);

  const formik = useFormik({
    initialValues: {
      location: `${t('hotel_page.form_of_found_hotels.initial_location')}`,
      date: formatDateToStringByDot(selectedDate),
      days: '1',
    },
    onSubmit: ({ location, days }) => {
      dispatch(setCounterDaysStay(days));
      dispatch(setSearchParams({ location, date: selectedDate, days }));
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
  const hotelListId = useSelector((state) => state.hotels.hotelList.ids);
  const city = useSelector(({ searchParams }) => searchParams.searchParams.location);
  const { date: checkInDate } = useSelector((state) => state.calendar);
  const formattedCheckInDate = formatDateToStringByFullDate(checkInDate);
  const { t } = useTranslation();
  const auth = useAuth();

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
              <Button variant="secondary" onClick={() => auth.logOut()}><i className="fas fa-arrow-right-from-bracket" /></Button>
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
                  <Row>
                    <span>
                      <span><h2 display="inline">{`${t('hotel_page.hotels')}`}</h2></span>
                      <span><i className="fas fa-angle-right fa-2x" /></span>
                      <span><h2 display="inline">{`${translateCitiesOnRu[city]}`}</h2></span>
                      <span><h2 display="inline">{formattedCheckInDate}</h2></span>
                    </span>
                  </Row>
                  <Row>Pictures</Row>
                  <Row>{t('hotel_page.addInFavorite', { hotelCount: 5 })}</Row>
                  <Row>{hotelListId.map((id) => (<HotelItem key={id} hotelId={id} />))}</Row>
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
