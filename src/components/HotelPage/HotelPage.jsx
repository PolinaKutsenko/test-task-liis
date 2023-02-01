import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  Col, Container, Navbar, Row, Card, Button,
} from 'react-bootstrap';

import { useAuth } from '../../hooks/index.js';
import translateCitiesOnRu from '../../locales/translateCitiesOnRu.js';
import formatDateToStringByFullDate from '../../formatters/formatDateToStringByFullDate.js';
import HotelCalendar from './components/HotelCalendar.jsx';
import HotelItem from './components/HotelItem.jsx';
import HotelCarousel from './components/HotelCarousel.jsx';
import HotelFavoritesForm from './components/HotelFavoritesForm.jsx';
import HotelSearchForm from './components/HotelSearchForm.jsx';

const HotelPage = () => {
  const { t } = useTranslation();
  const hotelListId = useSelector((state) => state.hotels.hotelList.ids);
  const favoriteHotelListId = useSelector((state) => state.favorites.favoriteHotels.ids);
  const city = useSelector(({ searchParams }) => searchParams.searchParams.location);
  const { date: checkInDate } = useSelector((state) => state.calendar);
  const formattedCheckInDate = formatDateToStringByFullDate(checkInDate);
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
                    <HotelSearchForm />
                  </Card.Body>
                </Card>
              </Row>
              <Row>
                <Card>
                  <Card.Body className="p-5">
                    <Row><h3>{t('hotel_page.favorites')}</h3></Row>
                    <Row><HotelFavoritesForm /></Row>
                    <Row>
                      {favoriteHotelListId.map((id) => (
                        <HotelItem key={id} hotelId={id} />))}
                    </Row>
                  </Card.Body>
                </Card>
              </Row>
            </Col>
            <Col md={8}>
              <Card>
                <Card.Body className="p-5">
                  <Row>
                    <span>
                      <span><h2 style={{ display: 'inline' }}>{`${t('hotel_page.hotels')} `}</h2></span>
                      <span><i className="fas fa-angle-right fa-2x" /></span>
                      <span><h2 style={{ display: 'inline' }}>{` ${translateCitiesOnRu[city]} `}</h2></span>
                      <span><h2 style={{ display: 'inline', textAlign: 'right' }}>{formattedCheckInDate}</h2></span>
                    </span>
                  </Row>
                  <Row className="justify-content-md-center">
                    <Col md={{ span: 6, offset: 3 }}>
                      <HotelCarousel />
                    </Col>
                  </Row>
                  <Row>{t('hotel_page.favoritesHotelCount', { count: favoriteHotelListId.length })}</Row>
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
