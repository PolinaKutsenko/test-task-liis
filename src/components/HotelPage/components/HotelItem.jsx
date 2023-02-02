import { useSelector, useDispatch } from 'react-redux';
import {
  Col, Row, Card, Container, Button,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import _ from 'lodash';

import formatDateToStringByFullDate from '../../../formatters/formatDateToStringByFullDate';
import { addFavoriteHotel, deleteFavoriteHotel } from '../../../slices/favoritesSlice.js';
import '../../../css/HotelItem.css';

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
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const hotelData = useSelector((state) => {
    const hotelDataFromHotelList = state.hotels.hotelList.entities[hotelId];
    const hotelDataFromFavoritesList = state.favorites.favoriteHotels.entities[hotelId];
    return hotelDataFromHotelList ?? hotelDataFromFavoritesList;
  });
  const favoriteHotels = useSelector((state) => state.favorites.favoriteHotels.ids);
  const { counterDaysStay } = useSelector((state) => state.searchParams);
  const { date: checkInDate } = useSelector((state) => state.calendar);
  const formattedCheckInDate = formatDateToStringByFullDate(checkInDate);

  const heartClassName = cn('fa-heart', {
    far: !favoriteHotels.includes(hotelId),
    fas: favoriteHotels.includes(hotelId),
  });

  const handleFavoriteHotel = () => {
    const isTheHotelFavorite = favoriteHotels.includes(hotelId);
    if (isTheHotelFavorite) {
      dispatch(deleteFavoriteHotel(hotelData));
      return;
    }
    dispatch(addFavoriteHotel(hotelData));
  };

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
            <Row><p>{`${formattedCheckInDate} - ${t('hotel_page.hotel_item.daysCount', { count: Number(counterDaysStay) })}`}</p></Row>
            <Row><Stars starCount={hotelData.stars} /></Row>
          </Col>
          <Col>
            <Row>
              <Button onClick={handleFavoriteHotel} type="button" variant="secondary" className="likeButton">
                <i className={heartClassName} />
              </Button>
            </Row>
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
