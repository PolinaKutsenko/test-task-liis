import { useSelector/* , useDispatch */ } from 'react-redux';
import {
  Col, Row, Card, Container, Button,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import _ from 'lodash';
import formatDateToStringByFullDate from '../../formatters/formatDateToStringByFullDate';
import '../../css/HotelItem.css';

const Stars = ({ starCount }) => {
  const emptyArray = [0, 1, 2, 3, 4];
  const starArray = emptyArray.map((index) => (index + 1 > starCount ? 0 : 1));
  const starsClassNames = starArray.map((star) => (
    cn('fa-star', {
      far: star === 0,
      fas: star === 1,
    })));
  return (
    <span>
      {starsClassNames.map((starClassName) => (
        <span key={_.uniqueId()}><i className={starClassName} /></span>))}
    </span>
  );
};

const HotelItem = ({ hotelId }) => {
  // const dispatch = useDispatch();
  const hotelData = useSelector((state) => state.hotels.hotelList.entities[hotelId]);
  const favoriteHotels = useSelector((state) => state.hotels.favoriteHotelsId);
  const { counterDaysStay } = useSelector((state) => state.searchParams);
  const { date: checkInDate } = useSelector((state) => state.calendar);
  const { t } = useTranslation();

  const formattedCheckInDate = formatDateToStringByFullDate(checkInDate);
  const heartClassName = cn('fa-heart', {
    far: !favoriteHotels.includes(hotelId),
    fas: favoriteHotels.includes(hotelId),
  });

  return (
    <Container fluid className="h-900">
      <Card>
        <Row className="justify-content-center align-content-center h-100">
          <Col>
            <span className="fa-stack fa-3x homeIcon">
              <i className="fas fa-circle fa-stack-2x" />
              <i className="fas fa-house fa-stack-1x fa-inverse" />
            </span>
          </Col>
          <Col xs={6}>
            <Row><h5>{hotelData.hotelName}</h5></Row>
            <Row><p>{`${formattedCheckInDate} - ${t('hotel_page.hotel_item.days.key', { count: counterDaysStay })}`}</p></Row>
            <Row><Stars starCount={hotelData.stars} /></Row>
          </Col>
          <Col>
            <Row><Button type="button" variant="secondary" className="likeButton"><i className={heartClassName} /></Button></Row>
            <Row>
              <span>{`${t('hotel_page.hotel_item.price')} ${Math.round(hotelData.priceAvg)} ${t('hotel_page.hotel_item.currency')}`}</span>
            </Row>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default HotelItem;
