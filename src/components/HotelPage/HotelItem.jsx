import { useSelector, useDispatch } from 'react-redux';
import {
  Col, Row, Card, Button, Container,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const HotelItem = ({ hotelId }) => {
  const dispatch = useDispatch();
  const hotelData = useSelector((state) => state.hotels.hotelList.entities[hotelId]);
  const { t } = useTranslation();

  console.log(dispatch, hotelData);
  return (
    <Container fluid className="h-900">
      <Card>
        <Row className="justify-content-center align-content-center h-100">
          <Col>1</Col>
          <Col xs={6}>1</Col>
          <Col>
            <Row><Button type="button" variant="light"><i className="far fa-heart" /></Button></Row>
            <Row>
              <span>{`${t('hotel_page.hotel_item.price')} ${hotelData.priceAvg} ${t('hotel_page.hotel_item.currency')}`}</span>
            </Row>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default HotelItem;
